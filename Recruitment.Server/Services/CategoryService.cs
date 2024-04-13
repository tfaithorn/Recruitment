using Dapper;
using Recruitment.Server.Database;
using Recruitment.Server.Dtos;
using System.Data.SqlClient;
using System.Diagnostics;

namespace Recruitment.Server.Services;

public class CategoryService
{
    public List<Category> FindBy(CategoryCriteria criteria)
    { 
        var sqlClient = new SqlClient();
        var queryParameters = new SqlClient.QueryParameters();
        var sql = @"SELECT * 
                    FROM Category";
        var joins = new List<string>();
        List<SqlCondition> conditions = new List<SqlCondition>();

        if (criteria.PositionId != null)
        {
            joins.Add("JOIN PositionCategory ON PositionCategory.CategoryId = Category.id");
            conditions.Add(new SqlCondition("PositionCategory.PositionId", criteria.PositionId));
        }
        sql += " " + string.Join(" ", joins.ToArray());
        sql += conditions.Count > 0 ? " WHERE " + sqlClient.PrepareConditions(conditions, queryParameters) : "";

        List<Category> categories = new List<Category>();
        using (var conn = new SqlConnection(sqlClient.GetConnectionString()))
        {
            Debug.WriteLine(sql);
            categories = conn.Query<Category>(sql, queryParameters.parameters).ToList();
        }
        return categories;
    }
}
