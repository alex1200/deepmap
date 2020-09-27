package core.media;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import core.explorer.concordance.ConcordanceObject;
import core.explorer.location.MediaObject;
import core.explorer.location.SearchLocationObject;
import core.explorer.location.SearchLocationResponse;
import org.restlet.engine.util.StringUtils;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander on 5/20/2017.
 */
public class MediaGettyResource  extends AbstractServerResource {


    @Override
    protected Representation processGet(Representation representation) {
        String location = getAttribute("location");
        location = StringUtils.htmlUnescape(location);
        List<MediaObject> mediaList = new ArrayList<>();
        ServerManager.getEngine().getGetty(location, mediaList);

        String jsonReturn = new Gson().toJson(mediaList);
        return new StringRepresentation(jsonReturn);
    }

    @Override
    protected Representation processPost(Representation representation) {
//        try {
//            String jsonString = representation.getText();
//            SearchLocationObject search = new Gson().fromJson(jsonString, SearchLocationObject.class);
//
//            List<MediaObject> mediaList = new ArrayList<>();
//
//            for(String location : locations){
//                ServerManager.getEngine().getHarvardArt(location, mediaList);
//                ServerManager.getEngine().getGetty(location, mediaList);
//            }
//
//            response.setConcordanceList(concordanceList);
//            response.setMediaList(mediaList);
//
////            SearchLocationResponse
//            String jsonReturn = new Gson().toJson(response);
//            return new StringRepresentation(jsonReturn);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        System.out.println(representation);
        return null;
    }
}
