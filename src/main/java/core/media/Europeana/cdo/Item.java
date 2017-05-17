
package core.media.Europeana.cdo;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Item {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("title")
    @Expose
    private List<String> title = null;
    @SerializedName("dataProvider")
    @Expose
    private List<String> dataProvider = null;
    @SerializedName("rights")
    @Expose
    private List<String> rights = null;
    @SerializedName("dcTitleLangAware")
    @Expose
    private DcTitleLangAware dcTitleLangAware;
    @SerializedName("dcCreatorLangAware")
    @Expose
    private DcCreatorLangAware dcCreatorLangAware;
    @SerializedName("europeanaCompleteness")
    @Expose
    private Integer europeanaCompleteness;
    @SerializedName("edmPlaceLatitude")
    @Expose
    private List<String> edmPlaceLatitude = null;
    @SerializedName("edmPlaceLongitude")
    @Expose
    private List<String> edmPlaceLongitude = null;
    @SerializedName("dcCreator")
    @Expose
    private List<String> dcCreator = null;
    @SerializedName("edmPreview")
    @Expose
    private List<String> edmPreview = null;
    @SerializedName("edmIsShownAt")
    @Expose
    private List<String> edmIsShownAt = null;
    @SerializedName("guid")
    @Expose
    private String guid;
    @SerializedName("year")
    @Expose
    private List<String> year = null;
    @SerializedName("provider")
    @Expose
    private List<String> provider = null;
    @SerializedName("score")
    @Expose
    private Double score;
    @SerializedName("link")
    @Expose
    private String link;
    @SerializedName("type")
    @Expose
    private String type;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getTitle() {
        return title;
    }

    public void setTitle(List<String> title) {
        this.title = title;
    }

    public List<String> getDataProvider() {
        return dataProvider;
    }

    public void setDataProvider(List<String> dataProvider) {
        this.dataProvider = dataProvider;
    }

    public List<String> getRights() {
        return rights;
    }

    public void setRights(List<String> rights) {
        this.rights = rights;
    }

    public DcTitleLangAware getDcTitleLangAware() {
        return dcTitleLangAware;
    }

    public void setDcTitleLangAware(DcTitleLangAware dcTitleLangAware) {
        this.dcTitleLangAware = dcTitleLangAware;
    }

    public DcCreatorLangAware getDcCreatorLangAware() {
        return dcCreatorLangAware;
    }

    public void setDcCreatorLangAware(DcCreatorLangAware dcCreatorLangAware) {
        this.dcCreatorLangAware = dcCreatorLangAware;
    }

    public Integer getEuropeanaCompleteness() {
        return europeanaCompleteness;
    }

    public void setEuropeanaCompleteness(Integer europeanaCompleteness) {
        this.europeanaCompleteness = europeanaCompleteness;
    }

    public List<String> getEdmPlaceLatitude() {
        return edmPlaceLatitude;
    }

    public void setEdmPlaceLatitude(List<String> edmPlaceLatitude) {
        this.edmPlaceLatitude = edmPlaceLatitude;
    }

    public List<String> getEdmPlaceLongitude() {
        return edmPlaceLongitude;
    }

    public void setEdmPlaceLongitude(List<String> edmPlaceLongitude) {
        this.edmPlaceLongitude = edmPlaceLongitude;
    }

    public List<String> getDcCreator() {
        return dcCreator;
    }

    public void setDcCreator(List<String> dcCreator) {
        this.dcCreator = dcCreator;
    }

    public List<String> getEdmPreview() {
        return edmPreview;
    }

    public void setEdmPreview(List<String> edmPreview) {
        this.edmPreview = edmPreview;
    }

    public List<String> getEdmIsShownAt() {
        return edmIsShownAt;
    }

    public void setEdmIsShownAt(List<String> edmIsShownAt) {
        this.edmIsShownAt = edmIsShownAt;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public List<String> getYear() {
        return year;
    }

    public void setYear(List<String> year) {
        this.year = year;
    }

    public List<String> getProvider() {
        return provider;
    }

    public void setProvider(List<String> provider) {
        this.provider = provider;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
