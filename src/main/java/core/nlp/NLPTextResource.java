package core.nlp;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.File.FileCommons;
import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.List;

public class NLPTextResource  extends AbstractServerResource {

    private String DIRECTORY = "NLPTexts";

    @Override
    protected Representation processGet(Representation representation) {
        String textUID = getAttribute("textUID");
        List<DBRow> dbRows = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`nlp_text` WHERE `uid`='" + textUID + "';");
        if (dbRows.size() > 0) {
            DBRow dbRow1 = dbRows.get(0);
            String filePath  = dbRow1.row.get(2).getKey().toString();
            String text = FileCommons.getInstance().readFile(filePath);

            String locations = FileCommons.getInstance().readFile(DIRECTORY + "/" + textUID + "/LOCATIONS.txt");
            String people = FileCommons.getInstance().readFile(DIRECTORY + "/" + textUID + "/PEOPLE.txt");
            return buildRepresentation(text + locations + people);
        }
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }

//    protected Representation buildRepresentation(String table) {
//        Gson gson = new Gson();
//        String response;
//        if(null != table) {
//            response = gson.toJson(table);
//            String response1 = "{\"status\":\"SUCCESS\",\"text\":" + response + "}";
//            return new StringRepresentation(response1);
//        } else {
//            response = "{\"status\":\"ERROR\",\"text\":\"\"}";
//            return new StringRepresentation(response);
//        }
//    }
}
