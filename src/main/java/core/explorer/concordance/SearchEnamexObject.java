package core.explorer.concordance;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander Reinhold on 29/06/2017.
 */
public class SearchEnamexObject {
    private String word;
    private double lat;
    private double lon;
    public List<String> textSelection = new ArrayList<>();


    public SearchEnamexObject(){

    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public List<String> getTextSelection() {
        return textSelection;
    }

    public void setTextSelection(List<String> textSelection) {
        this.textSelection = textSelection;
    }
}
