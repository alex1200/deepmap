package core.explorer.concordance;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander Reinhold on 10/05/2017.
 */
public class SearchObject {
    public String term = "";
    public String secondaryTerm = "";
    public int concordanceLimit = 0;
    public boolean fuzzy = false;
    public List<String> textSelection = new ArrayList<>();

    public SearchObject(){

    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getSecondaryTerm() {
        return secondaryTerm;
    }

    public void setSecondaryTerm(String secondaryTerm) {
        this.secondaryTerm = secondaryTerm;
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

    public List<String> getTextSelection() {
        return textSelection;
    }

    public void setTextSelection(List<String> listTextUID) {
        this.textSelection = listTextUID;
    }
}
