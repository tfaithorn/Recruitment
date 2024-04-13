using Recruitment.Server.Services;

namespace Recruitment.Server.Dtos;

public class Position
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public int? ApplicantTotal { get; set; }
    public int? HiredTotal { get; set; }
    public int? DeclinedTotal { get; set; }
    public string? CreatedBy { get; set; }
    public string? WorkType { get; set; }
    public string? ContactEmail { get; set; }
    public string? ShortDescription { get; set; }
    public string? LongDescription { get; set; }
    public List<Category>? Categories { get; set; }
    public string? PayType { get; set; }
    public int? MinimumSalary { get; set; }
    public int? MaximumSalary { get; set; }
    public int? VisibleSalary { get; set; }
    public List<PositionApplicant>? PositionApplicants { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<Stage>? Stages { get; set; }
    public List<Location>? Locations { get; set; }
}
