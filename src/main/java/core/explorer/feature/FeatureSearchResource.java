package core.explorer.feature;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import core.explorer.concordance.ConcordanceObject;
import core.explorer.concordance.SearchEnamexObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;


import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FeatureSearchResource extends AbstractServerResource{

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
                    concordanceList = ServerManager.getEngine().search(search.getWord(),10,false, search.getTextSelection());
                    if(concordanceList.size() == 0){
                        concordanceList = ServerManager.getEngine().searchEnamex(search.getLat(),search.getLon(),10,false, search.getTextSelection());
                    }
                }
                else{
                    concordanceList = ServerManager.getEngine().searchEnamex(search.getLat(),search.getLon(),10,false, search.getTextSelection());
                }
                System.out.println("Feature Search found " + concordanceList.size() + " locations");
                String jsonReturn = new Gson().toJson(concordanceList);
                return new StringRepresentation(jsonReturn);

            } catch (IOException e) {
                e.printStackTrace();
            }

            System.out.println(representation);
            return null;
        }

}
