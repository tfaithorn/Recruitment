namespace Recruitment.Server.Dtos;

public class PositionApplicantAnswer
{
    public string Question {  get; set; }
    public string Answer { get; set; }

    public PositionApplicantAnswer(string question, string answer)
    {
        this.Question = question;
        this.Answer = answer;
    }
}
