package core.explorer;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExplorerSearchResource  extends AbstractServerResource {


    @Override
    protected Representation processGet(Representation representation) {
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        try {
            String jsonString = representation.getText();
            SearchObject search = new Gson().fromJson(jsonString, SearchObject.class);
            List<ConcordanceObject> concordanceList = new ArrayList<>();

            if(null != search.getSecondaryTerm() && search.getSecondaryTerm().equalsIgnoreCase("") == false) {
                concordanceList = ServerManager.getEngine().search(search.getTerm(),search.getSecondaryTerm(),search.getConcordanceLimit(),search.isFuzzy());
            }
            else{
                concordanceList = ServerManager.getEngine().search(search.getTerm(),search.getConcordanceLimit(),search.isFuzzy());
            }
            String jsonReturn = new Gson().toJson(concordanceList);
            return new StringRepresentation(jsonReturn);

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(representation);
        return null;
    }
}
