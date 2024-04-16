using Dapper;
using Recruitment.Server.Dtos;
using System.Data.Common;
using System.Data.SqlClient;
using System.Diagnostics;

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
                sql += " " + logicalOperator + " ";
            }

            var parameterName = queryParameters.Add(condition.Value);
            sql += condition.Key + " " + condition.Operator + " " + parameterName + " ";
            i++;
        }
        return sql;
    }

    public string PrepareInsert(string tableName, Dictionary<string, object> values, QueryParameters queryParameters)
    {
        var sql = $"INSERT INTO {tableName} ";
        var fieldNames = new List<string>();
        var parameterNames = new List<string>();

        foreach (var value in values)
        {
            fieldNames.Add(value.Key);
            parameterNames.Add(queryParameters.Add(value.Value));
        }

        sql += "(" + string.Join(", ", fieldNames) + ")";
        sql += " VALUES (" + string.Join(", ", parameterNames) + ");";
        return sql;
    }

    public string PrepareDelete(string tableName, List<SqlCondition> conditions, QueryParameters queryParameters)
    {
        var sql = $"DELETE FROM {tableName} WHERE ";
        sql += this.PrepareConditions(conditions, queryParameters) + ";";
        return sql;
    }

    public void ReplaceAssociativeValues(
        int id,
        string idColName,
        string associativeIdColName,
        string tableName,
        List<int> newIds, 
        SqlConnection conn, 
        SqlTransaction trans = null)
    {

        var currentIdsSql = $"SELECT {associativeIdColName} FROM {tableName} WHERE {idColName} = " + id + ";";
        Debug.WriteLine(currentIdsSql);
        List<int> currentIds = conn.Query<int>(currentIdsSql, transaction: trans).ToList();

        var deleteQueryParams = new SqlClient.QueryParameters();
        var deleteSql = $"DELETE FROM {tableName} WHERE {idColName} = {id} AND {associativeIdColName} NOT IN @associativeIdValues;";
        Debug.WriteLine(deleteSql);
        conn.Execute(
            sql: deleteSql,
            param: new Dictionary<string, object>() { { "@associativeIdValues", newIds } },
            transaction: trans);

        foreach (int newId in newIds)
        {
            if (!currentIds.Contains(newId))
            {
                var insertQueryParams = new SqlClient.QueryParameters();
                var values = new Dictionary<string, object>()
                {
                    { idColName, id },
                    { associativeIdColName, newId }
                };
                var insertSql = PrepareInsert(tableName, values, insertQueryParams);
                Debug.WriteLine(insertSql);
                conn.Execute(sql: insertSql, param: insertQueryParams.parameters, transaction: trans);
            }
        }
    }
}
