package core.media.HarvardArtMuseum;

import java.util.List;

/**
 * Created by Alexander on 5/16/2017.
 */
public class HarvardArtWrapper {
    public HarvardArtInfo info;
    public List<HarvardArtRecord> records;

    public HarvardArtWrapper(){

    }

    public HarvardArtInfo getInfo() {
        return info;
    }

    public void setInfo(HarvardArtInfo info) {
        this.info = info;
    }

    public List<HarvardArtRecord> getRecords() {
        return records;
    }

    public void setRecords(List<HarvardArtRecord> records) {
        this.records = records;
    }
}
