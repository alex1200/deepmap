package core.survey;

public class SurveyAnswer {
    public String question;
    public String answer;
    public String user;

    public SurveyAnswer(){
        question ="undefined";
        answer = "undefined";
        user = "undefined";
    }
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
