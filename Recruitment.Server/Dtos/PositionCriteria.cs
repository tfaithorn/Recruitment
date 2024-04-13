namespace Recruitment.Server.Dtos;

public class PositionCriteria
{
    public bool? IncludeApplicants { get; set; }
    public bool? IncludeStages { get; set; }
    public bool? IncludeApplicantTotal { get; set; }
    public bool? IncludeHiredTotal { get; set; }
    public bool? IncludeDeclinedTotal { get; set; }
    public bool? IncludeCategories { get; set; }
    public bool? IncludeLocations { get; set; }
    public int? id { get; set; }
    public string? OrderBy { get; set; }
}
