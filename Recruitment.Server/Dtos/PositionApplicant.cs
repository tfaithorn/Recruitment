namespace Recruitment.Server.Dtos;

public class PositionApplicant
{
    public Applicant? Applicant { get; set; }
    public Position? Position { get; set; }
    public Stage Stage { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public PositionApplicantAnswer? Answer { get; set; }
}
