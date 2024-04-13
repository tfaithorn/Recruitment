using System.Reflection.Metadata;

namespace Recruitment.Server.Dtos;

public class PositionInput
{
    public string? Name { get; set; }
    public string? WorkType { get; set; }
    public string? ContactEmail { get; set; }
    public string? CategoryId { get; set; }
    public string? PayType { get; set; }
    public string? MinimumSalary { get; set; }
    public string? MaximumSalary { get; set; }
    public string? VisibleSalary { get; set; }
    public string? ShortDescription { get; set; }
    public string? LongDescription { get; set; }
}
