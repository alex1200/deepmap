package core.holocaust.location;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander on 5/15/2017.
 */
public class SearchLocationObject {
    public double lat = 0;
    public double lng = 0;
    public double radius = 0;
    public int concordanceLimit = 0;
    public boolean fuzzy = false;
    public String location;
    public List<String> textSelection = new ArrayList<>();

    public SearchLocationObject(){

    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public int getConcordanceLimit() {
        return concordanceLimit;
    }

    public void setConcordanceLimit(int concordanceLimit) {
        this.concordanceLimit = concordanceLimit;
    }

    public boolean isFuzzy() {
        return fuzzy;
    }

    public void setFuzzy(boolean fuzzy) {
        this.fuzzy = fuzzy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getTextSelection() {
        return textSelection;
    }

    public void setTextSelection(List<String> textSelection) {
        this.textSelection = textSelection;
    }
}
