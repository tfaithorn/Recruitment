namespace Recruitment.Server.Dtos;

public class Applicant
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string CreatedAt { get; set; }
    public string UpdatedAt { get; set; }
    public List<PositionApplicant>? PositionApplications { get; set; }
}
