using Dapper;
using Recruitment.Server.Database;
using Recruitment.Server.Dtos;
using Recruitment.Server.Entities;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Xml.Linq;

namespace Recruitment.Server.Services;

public class PositionService
{
    private readonly string tableName = "Position";

    public List<Position> FindBy(PositionCriteria criteria)
    {
        var sqlClient = new SqlClient();
        var queryParameters = new SqlClient.QueryParameters();
        
        var sql = "SELECT ";
        var selectCriteria = new List<string>() { "Position.*" };
        var conditions = new List<SqlCondition>();

        if (criteria.IncludeApplicantTotal ?? false)
        {
            selectCriteria.Add(@"(
                            SELECT COUNT(*) 
                            FROM PositionApplicant 
                            WHERE 
                                PositionId = Position.Id 
                        ) AS ApplicantTotal");
        }

        if (criteria.IncludeHiredTotal ?? false)
        {
            selectCriteria.Add(@"(
                            SELECT COUNT(*) 
                            FROM PositionApplicant 
                            WHERE 
                                PositionId = Position.Id 
                                AND StageId IN (SELECT Id FROM Stage WHERE slug = 'hired')
                        ) AS HiredTotal");
        }

        if (criteria.IncludeDeclinedTotal ?? false)
        {
            selectCriteria.Add(@"(
                            SELECT COUNT(*) 
                            FROM PositionApplicant
                            WHERE 
                                PositionId = Position.Id 
                                 AND StageId IN (SELECT Id FROM Stage WHERE slug = 'declined')
                        ) AS DeclinedTotal");
        }

        sql += string.Join(", ", selectCriteria.ToArray());
        sql += $" FROM {tableName}";

        if (criteria.id != null)
        {
            conditions.Add(new SqlCondition("Position.Id", criteria.id));
        }

        if (conditions.Count > 0)
        {
            sql += " WHERE " + sqlClient.PrepareConditions(conditions, queryParameters);
        }

        if (criteria.OrderBy != null)
        {
            var orderByStr = " ORDER BY ";
            var orderByParts = criteria.OrderBy.Split(',');
            foreach (var orderByPart in orderByParts)
            {
                var selectorParts = orderByPart.Split(" ");
                if (selectorParts.Length == 2)
                {
                    if (selectorParts[0].ToLower() == "position.id")
                    {
                        orderByStr += "Position.id";
                    }

                    orderByStr += " ";
                    if (selectorParts[1].ToLower() == "asc")
                    {
                        orderByStr += "ASC";
                    }
                    else if (selectorParts[1].ToLower() == "desc")
                    {
                        orderByStr += "DESC";
                    }
                }
            }
            sql += " " + orderByStr;
        }

        var positions = new List<Position>();
        using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
        {
            Debug.WriteLine(sql);
            positions = conn.Query<Position>(sql, queryParameters.parameters).ToList();
        }

        if (criteria.IncludeApplicants ?? false)
        {
            ApplicantService applicantService = new ApplicantService();
            using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
            {
                foreach (Position position in positions)
                {
                    position.PositionApplicants = conn.Query<PositionApplicant, Applicant, Stage, PositionApplicant>(
                        $@"SELECT 
                            PositionApplicant.*, Applicant.*, Stage.*, PositionStage.Position
                        FROM PositionApplicant
                        JOIN Applicant ON Applicant.id = PositionApplicant.id
                        JOIN Stage ON Stage.id = PositionApplicant.stageId
                        LEFT JOIN PositionStage ON PositionStage.StageId = Stage.id AND PositionStage.PositionId = PositionApplicant.PositionId
                        WHERE 
                            PositionApplicant.PositionId = {position.Id}",
                        (pa, a, s) => {
                            pa.Applicant = a;
                            pa.Stage = s;
                            return pa;
                        },
                        splitOn: "Id"
                    ).ToList();
                }
            }
        }

        if (criteria.IncludeStages ?? false)
        {
            using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
            {
                foreach (Position position in positions)
                {
                    position.Stages = conn.Query<Stage>(
                        $@"SELECT Stage.*, PositionStage.position
                        FROM Stage
                        JOIN PositionStage ON PositionStage.StageId = Stage.id 
                        WHERE 
                            PositionStage.PositionId = {position.Id}
                        ORDER BY 
                            PositionStage.Position ASC"
                    ).ToList();
                }
            }
        }

        if (criteria.IncludeLocations ?? false) 
        {
            var locationService = new LocationService();
            foreach (Position position in positions)
            {
                position.Locations = locationService.FindBy(new LocationCriteria() { PositionId = position.Id });
            }
        }

        if (criteria.IncludeCategories ?? false)
        {
            var categoryService = new CategoryService();
            foreach (Position position in positions)
            {
                position.Categories = categoryService.FindBy(new CategoryCriteria() { PositionId = position.Id });
            }
        }

        return positions;
    }

    public async Task<Position> Create(PositionInput positionInput)
    {
        var sqlClient = new SqlClient();
        using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
        {
            conn.Open();
            using (var trans = conn.BeginTransaction())
            {
                try
                {
                    var sql = @"INSERT INTO Position (Name, WorkType, ContactEmail, ShortDescription, LongDescription, PayType, MinimumSalary, MaximumSalary, VisibleSalary)
                                VALUES (@Name, @WorkType, @ContactEmail, @ShortDescription, @LongDescription, @PayType, @MinimumSalary, @MaximumSalary, @VisibleSalary)";

                    Dictionary<string, object> parameters = new Dictionary<string, object>();
                    parameters["@Name"] = positionInput.Name;
                    parameters["@WorkType"] = positionInput.WorkType;
                    parameters["@ContactEmail"] = positionInput.ContactEmail;
                    parameters["@ShortDescription"] = positionInput.ShortDescription;
                    parameters["@LongDescription"] = positionInput.LongDescription;
                    parameters["@PayType"] = positionInput.PayType;
                    parameters["@MinimumSalary"] = positionInput.MinimumSalary;
                    parameters["@MaximumSalary"] = positionInput.MaximumSalary;
                    parameters["@VisibleSalary"] = positionInput.VisibleSalary;
                    sql += "; SELECT SCOPE_IDENTITY()";

                    int positionId = await conn.QueryFirstAsync<int>(sql, param: parameters, transaction: trans);
                    //TODO: Categories
                    if (positionInput.CategoryIds != null) {
                        foreach (int categoryId in positionInput.CategoryIds)
                        {
                        }
                    }

                    trans.Commit();

                    return this.FindBy(new PositionCriteria { id = positionId })[0];
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                    trans.Rollback();
                    throw new Exception(e.Message);
                }
            }
        }
    }

    public async Task<Position> Update(int id, PositionInput positionInput)
    {
        var sqlClient = new SqlClient();
        using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
        {
            conn.Open();
            using (var trans = conn.BeginTransaction())
            {
                try
                {
                    var sql = @"UPDATE Position 
                                SET 
                                    Name = @Name,
                                    WorkType = @WorkType, 
                                    ContactEmail = @ContactEmail, 
                                    ShortDescription = @ShortDescription, 
                                    LongDescription = @LongDescription, 
                                    PayType = @PayType, 
                                    MinimumSalary = @MinimumSalary, 
                                    MaximumSalary = @MaximumSalary, 
                                    VisibleSalary = @VisibleSalary
                                WHERE 
                                    Id = @Id";

                    Dictionary<string, object> parameters = new Dictionary<string, object>();
                    parameters["@Name"] = positionInput.Name;
                    parameters["@WorkType"] = positionInput.WorkType;
                    parameters["@ContactEmail"] = positionInput.ContactEmail;
                    parameters["@ShortDescription"] = positionInput.ShortDescription;
                    parameters["@LongDescription"] = positionInput.LongDescription;
                    parameters["@PayType"] = positionInput.PayType;
                    parameters["@MinimumSalary"] = positionInput.MinimumSalary;
                    parameters["@MaximumSalary"] = positionInput.MaximumSalary;
                    parameters["@VisibleSalary"] = positionInput.VisibleSalary;
                    parameters["@Id"] = id;

                    await conn.ExecuteAsync(sql, param: parameters, transaction: trans);

                    //categories
                    sqlClient.ReplaceAssociativeValues(
                        id: id,
                        idColName: "PositionId",
                        associativeIdColName: "CategoryId",
                        tableName: "PositionCategory",
                        newIds: positionInput.CategoryIds.ToList(),
                        conn: conn,
                        trans: trans);

                    //locations
                    sqlClient.ReplaceAssociativeValues(
                        id: id, 
                        idColName: "PositionId", 
                        associativeIdColName: "LocationId", 
                        tableName: "PositionLocation", 
                        newIds: positionInput.LocationIds.ToList(), 
                        conn: conn, 
                        trans: trans);

                    trans.Commit();
                    return this.FindBy(new PositionCriteria { id = id })[0];
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                    trans.Rollback();
                    throw new Exception(e.Message);
                }
            }
        }
    }
}
