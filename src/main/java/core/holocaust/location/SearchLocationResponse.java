package core.holocaust.location;

import core.holocaust.concordance.ConcordanceObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander on 5/15/2017.
 */
public class SearchLocationResponse {
    public List<ConcordanceObject> concordanceList = new ArrayList<>();
    public List<MediaObject> mediaList = new ArrayList<>();

    public SearchLocationResponse(){

    }

    public List<ConcordanceObject> getConcordanceList() {
        return concordanceList;
    }

    public void setConcordanceList(List<ConcordanceObject> concordanceList) {
        this.concordanceList = concordanceList;
    }

    public List<MediaObject> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<MediaObject> mediaList) {
        this.mediaList = mediaList;
    }
}
