namespace Recruitment.Server.Dtos;

public class ApplicantCriteria
{
    public int? Id { get; set; }
    public int? PositionId { get; set; }
    public bool? IncludePositionApplicant {  get; set; }
}
