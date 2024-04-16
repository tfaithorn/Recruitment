using Recruitment.Server.Dtos;
using Dapper;
using System.Data.SqlClient;
using System.Diagnostics;
using static Recruitment.Server.Database.SqlClient;
using Recruitment.Server.Database;

namespace Recruitment.Server.Services;

public class ApplicantService
{
    private string tableName = "Applicant";

    public List<Applicant> FindBy(ApplicantCriteria criteria)
    {
        var sqlClient = new SqlClient();
        var queryParameters = new SqlClient.QueryParameters();

        var sql = "SELECT ";
        var selectStrs = new List<string>(){ "Applicant.*" };
        var joinCriteria = new List<string>();
        var conditions = new List<SqlCondition>();

        sql += string.Join(", ", selectStrs.ToArray());
        sql += $" FROM {tableName}";

        if (criteria.PositionId != null)
        {
            joinCriteria.Add("JOIN PositionApplicant ON PositionApplicant.ApplicantId = Applicant.id");
            conditions.Add(new SqlCondition("PositionId", criteria.PositionId));
        }

        if (criteria.Id != null)
        {
            conditions.Add(new SqlCondition("Applicant.Id", criteria.Id));
        }

        if (joinCriteria.Count > 0)
        {
            sql += " " + string.Join(" ", joinCriteria.ToArray());
        }

        if (conditions.Count > 0)
        {
            sql += " WHERE " + sqlClient.PrepareConditions(conditions, queryParameters);
        }

        var applicants = new List<Applicant>();
        using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
        {
            applicants = conn.Query<Applicant>(sql, queryParameters.parameters).ToList();
        }

        if (criteria.IncludePositions ?? false)
        {
            Debug.WriteLine("is including positions?");
            using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
            {
                foreach (var applicant in applicants)
                {
                    
                    var positionApplicationSql = @"SELECT PositionApplicant.*, Position.* 
                                                FROM PositionApplicant 
                                                JOIN Position ON Position.id = PositionApplicant.PositionId
                                                WHERE 
                                                    PositionApplicant.ApplicantId = " + applicant.Id;
                    applicant.PositionApplications = conn.Query<PositionApplicant, Position, PositionApplicant>(
                        positionApplicationSql,
                        (pa, p) => {
                            pa.Position = p;
                            return pa;
                        },
                        splitOn: "Id"
                        ).ToList();
                }
            }
        }

        return applicants;
    }
}
