package core.explorer.location;

import Commons.Server.AbstractServerResource;
import Commons.uid.UIDCommons;
import NLPCommons.GeoParse.GazetteerObject;
import com.flickr4java.flickr.photos.Photo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import core.ServerManager;
import core.explorer.concordance.ConcordanceObject;
import core.explorer.concordance.TokenObject;
import core.media.Flickr.FlickrModule;
import core.media.HarvardArtMuseum.HarvardArtRecord;
import core.media.HarvardArtMuseum.HarvardArtWrapper;
import core.media.HarvardArtMuseum.HarvardModule;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.io.*;
import java.util.*;

/**
 * Created by Alexander on 5/15/2017.
 */
public class ExplorerSearchLocationResource  extends AbstractServerResource {


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

            concordanceList = ServerManager.getEngine().search(search.getLat(),search.getLng(),search.getRadius(),search.getConcordanceLimit(),search.isFuzzy());


            List<MediaObject> mediaList = new ArrayList<>();

            ServerManager.getEngine().getFlickr(search.getLat(),search.getLng(),search.getRadius(), mediaList);
            ServerManager.getEngine().getEuropeana(search.getLat(),search.getLng(),search.getRadius(), mediaList);
            List<String> locations = ServerManager.getEngine().processLocations(concordanceList, search.getLat(),search.getLng(),search.getRadius());
            for(String location : locations){
                ServerManager.getEngine().getHarvardArt(location, mediaList);
                ServerManager.getEngine().getGetty(location, mediaList);
            }

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
