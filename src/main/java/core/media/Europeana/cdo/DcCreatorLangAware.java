
package core.media.Europeana.cdo;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DcCreatorLangAware {

    @SerializedName("def")
    @Expose
    private List<String> def = null;

    public List<String> getDef() {
        return def;
    }

    public void setDef(List<String> def) {
        this.def = def;
    }

}
