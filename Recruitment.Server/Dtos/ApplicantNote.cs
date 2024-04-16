namespace Recruitment.Server.Dtos;

public class ApplicantNote
{
    public int Id { get; set; }
    public int? ApplicantId { get; set; }
    public string? Content { get; set; }
    public User? Creator { get; set; }
    public DateTime CreatedAt { get; set; }
}
