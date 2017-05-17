
package core.media.Europeana.cdo;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class EuropeanaWrapper {

    @SerializedName("apikey")
    @Expose
    private String apikey;
    @SerializedName("success")
    @Expose
    private Boolean success;
    @SerializedName("requestNumber")
    @Expose
    private Integer requestNumber;
    @SerializedName("itemsCount")
    @Expose
    private Integer itemsCount;
    @SerializedName("totalResults")
    @Expose
    private Integer totalResults;
    @SerializedName("items")
    @Expose
    private List<Item> items = null;

    public String getApikey() {
        return apikey;
    }

    public void setApikey(String apikey) {
        this.apikey = apikey;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Integer getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(Integer requestNumber) {
        this.requestNumber = requestNumber;
    }

    public Integer getItemsCount() {
        return itemsCount;
    }

    public void setItemsCount(Integer itemsCount) {
        this.itemsCount = itemsCount;
    }

    public Integer getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(Integer totalResults) {
        this.totalResults = totalResults;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

}
