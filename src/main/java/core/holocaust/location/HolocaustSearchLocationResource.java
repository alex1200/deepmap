package core.holocaust.location;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import core.holocaust.concordance.ConcordanceObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander on 5/15/2017.
 */
public class HolocaustSearchLocationResource extends AbstractServerResource {


    @Override
    protected Representation processGet(Representation representation) {
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        try {
            String jsonString = representation.getText();
            SearchLocationObject search = new Gson().fromJson(jsonString, SearchLocationObject.class);
            List<ConcordanceObject> concordanceList = new ArrayList<>();
            SearchLocationResponse response = new SearchLocationResponse();

            concordanceList = ServerManager.getHoloEngine().search(search.getLat(),search.getLng(),search.getRadius(),search.getConcordanceLimit(),search.isFuzzy(),search.getTextSelection());

            List<MediaObject> mediaList = new ArrayList<>();

//            ServerManager.getHoloEngine().getFlickr(search.getLat(),search.getLng(),search.getRadius(), mediaList);
//            ServerManager.getHoloEngine().getEuropeana(search.getLat(),search.getLng(),search.getRadius(), mediaList);
            List<String> locations = ServerManager.getHoloEngine().processLocations(concordanceList, search.getLat(),search.getLng(),search.getRadius());
//            for(String location : locations){
//                ServerManager.getHoloEngine().getHarvardArt(location, mediaList);
//                ServerManager.getHoloEngine().getGetty(location, mediaList);
//            }

            response.setConcordanceList(concordanceList);
            response.setMediaList(mediaList);

//            SearchLocationResponse
            String jsonReturn = new Gson().toJson(response);
            return new StringRepresentation(jsonReturn);

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(representation);
        return null;
    }


}
