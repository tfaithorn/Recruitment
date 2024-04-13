namespace Recruitment.Server.Database;

public class SqlCondition
{
    public string Key { get; set; }
    public object Value { get; set; }
    public string Operator { get; set; }

    public SqlCondition(string Key, object Value, string Operator = "=")
    {
        this.Key = Key;
        this.Value = Value;
        this.Operator = Operator;
    }
}
