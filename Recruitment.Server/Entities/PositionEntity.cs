using Recruitment.Server.Dtos;

namespace Recruitment.Server.Entities;

public class PositionEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string createdBy { get; set; }
    public string WorkType { get; set; }
    public string ContactEmail { get; set; }
    public string ShortDescription { get; set; }
    public string LongDescription { get; set; }
    public string PayType { get; set; }
    public int MinimumSalary { get; set; }
    public int MaximumSalary { get; set; }
    public int VisibleSalary { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
