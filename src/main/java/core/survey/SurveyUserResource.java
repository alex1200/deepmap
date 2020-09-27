package core.survey;

import Commons.DB.DBConnection;
import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringEscapeUtils;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;

public class SurveyUserResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        SurveyUser sa = new SurveyUser();
        try {
            //String text = getResponse().getEntity().getText();
            String op = getRequestEntity().getText();
            Gson gson = new Gson();
            sa = gson.fromJson(op,SurveyUser.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(sa.getUser() + " " + sa.type);
        try {
            DBConnection.getInstance().insertDB("INSERT INTO `deepmap`.`survey_user` (idsurveyUser,type) VALUES('" + StringEscapeUtils.escapeHtml4(sa.getUser()) + "','" + StringEscapeUtils.escapeHtml4(sa.getType()) + "')");

            return new StringRepresentation("{\"status\":\"SUCCESS\"}");
        }
        catch (Exception e){

            return new StringRepresentation("{\"status\":\"ERROR\"}");
        }
    }
}
