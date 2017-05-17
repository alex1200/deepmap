package core.media.HarvardArtMuseum;

/**
 * Created by Alexander on 5/16/2017.
 */
public class HarvardArtInfo {
    public int totalrecordsperquery;
    public int totalrecords;
    public int pages;
    public int page;

    public HarvardArtInfo(){

    }

    public int getTotalrecordsperquery() {
        return totalrecordsperquery;
    }

    public void setTotalrecordsperquery(int totalrecordsperquery) {
        this.totalrecordsperquery = totalrecordsperquery;
    }

    public int getTotalrecords() {
        return totalrecords;
    }

    public void setTotalrecords(int totalrecords) {
        this.totalrecords = totalrecords;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
