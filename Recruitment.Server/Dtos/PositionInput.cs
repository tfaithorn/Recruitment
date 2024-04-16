using System.Reflection.Metadata;

namespace Recruitment.Server.Dtos;

public class PositionInput
{
    public string Name { get; set; }
    public string WorkType { get; set; }
    public string ContactEmail { get; set; }
    public int[] CategoryIds { get; set; }
    public int[] LocationIds { get; set; }
    public string PayType { get; set; }
    public int MinimumSalary { get; set; }
    public int MaximumSalary { get; set; }
    public int VisibleSalary { get; set; }
    public string ShortDescription { get; set; }
    public string LongDescription { get; set; }
}
