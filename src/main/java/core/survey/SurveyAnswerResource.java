package core.survey;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringEscapeUtils;
import org.restlet.data.Status;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.List;

public class SurveyAnswerResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
//        String question = getAttribute("question");
//        String answer = getAttribute("answer");
//        String user = getAttribute("user");
        SurveyAnswer sa = new SurveyAnswer();
        try {
            //String text = getResponse().getEntity().getText();
            String op = getRequestEntity().getText();
            Gson gson = new Gson();
            sa = gson.fromJson(op,SurveyAnswer.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            DBConnection.getInstance().insertDB("INSERT INTO `deepmap`.`survey_answers` (questionID,response,user) VALUES('" + StringEscapeUtils.escapeHtml4(sa.getQuestion()) + "','" + StringEscapeUtils.escapeHtml4(sa.getAnswer()) + "','"+StringEscapeUtils.escapeHtml4(sa.getUser())+"')");

            return new StringRepresentation("{\"status\":\"SUCCESS\"}");
        }
        catch (Exception e){

            return new StringRepresentation("{\"status\":\"ERROR\"}");
        }
    }
}