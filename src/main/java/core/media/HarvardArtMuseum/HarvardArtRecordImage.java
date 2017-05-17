package core.media.HarvardArtMuseum;

/**
 * Created by Alexander on 5/16/2017.
 */
public class HarvardArtRecordImage {
    public String iiifbaseuri;
    public String baseimageurl;
    public String publiccaption;
    public String idsid;
    public int displayorder;
    public String copyright;
    public String renditionnumber;

    public HarvardArtRecordImage(){

    }

    public String getIiifbaseuri() {
        return iiifbaseuri;
    }

    public void setIiifbaseuri(String iiifbaseuri) {
        this.iiifbaseuri = iiifbaseuri;
    }

    public String getBaseimageurl() {
        return baseimageurl;
    }

    public void setBaseimageurl(String baseimageurl) {
        this.baseimageurl = baseimageurl;
    }

    public String getPubliccaption() {
        return publiccaption;
    }

    public void setPubliccaption(String publiccaption) {
        this.publiccaption = publiccaption;
    }

    public String getIdsid() {
        return idsid;
    }

    public void setIdsid(String idsid) {
        this.idsid = idsid;
    }

    public int getDisplayorder() {
        return displayorder;
    }

    public void setDisplayorder(int displayorder) {
        this.displayorder = displayorder;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    public String getRenditionnumber() {
        return renditionnumber;
    }

    public void setRenditionnumber(String renditionnumber) {
        this.renditionnumber = renditionnumber;
    }
}
