using Recruitment.Server.Dtos;
using System.Data.Common;

namespace Recruitment.Server.Database;

public class SqlClient
{
    private static string connectionString;

    public string GetConnectionString()
    {
        return connectionString;
    }

    public class QueryParameters
    {
        private int counter = 0;
        public Dictionary<string, object> parameters = new Dictionary<string, object>();

        public string Add(object value)
        {
            counter++;
            var name = "@parameter" + counter;
            parameters.Add(name, value);
            return name;
        }
    }

    public static void SetConnectionString(string newConnectionString)
    {
        connectionString = newConnectionString;
    }

    public string PrepareConditions(List<SqlCondition> conditions, QueryParameters queryParameters, string logicalOperator = "AND")
    {
        var sql = "";
        var i = 0;
        foreach (SqlCondition condition in conditions)
        {
            if (i != 0)
            {
                sql += " " + logicalOperator;
            }

            var parameterName = queryParameters.Add(condition.Value);
            sql += condition.Key + " " + condition.Operator + " " + parameterName + " ";
            i++;
        }
        return sql;
    }
}
