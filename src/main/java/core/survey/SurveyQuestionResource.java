package core.survey;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import org.restlet.data.Status;
import org.restlet.representation.Representation;

import java.util.List;

public class SurveyQuestionResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        String page = getAttribute("page");
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`survey_questions` WHERE page='"+page+"'");
        getResponse().setStatus(Status.SUCCESS_OK);
        System.out.println(Status.SUCCESS_OK);
        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}