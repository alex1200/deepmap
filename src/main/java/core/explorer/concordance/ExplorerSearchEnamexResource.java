package core.explorer.concordance;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander Reinhold on 29/06/2017.
 */
public class ExplorerSearchEnamexResource extends AbstractServerResource {


    @Override
    protected Representation processGet(Representation representation) {
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        try {
            String jsonString = representation.getText();
            SearchEnamexObject search = new Gson().fromJson(jsonString, SearchEnamexObject.class);
            List<ConcordanceObject> concordanceList = new ArrayList<>();

            if(null != search.getWord()) {
                concordanceList = ServerManager.getEngine().searchEnamex(search.getWord(),10,false, search.getTextSelection());
            }
            else{
                concordanceList = ServerManager.getEngine().searchEnamex(search.getLat(),search.getLon(),10,false, search.getTextSelection());
            }
            System.out.println("Enamex Search found " + concordanceList.size() + " locations");
            String jsonReturn = new Gson().toJson(concordanceList);
            return new StringRepresentation(jsonReturn);

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(representation);
        return null;
    }
}
