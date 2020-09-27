package core.holocaust.concordance;

import Commons.uid.UIDCommons;

import java.util.ArrayList;
import java.util.List;

public class ConcordanceObject {
    public String UID;
    public String parentUID;
    public String term;
    public String concordanceString;
    public String concordanceStringLeading;
    public String concordanceStringTrailing;
    public List<TokenObject> concordance = new ArrayList<>();
    public int startIndex;
    public int termIndex;
    public int endIndex;
    public boolean hasLocation = false;

    public ConcordanceObject(){
        this.UID = UIDCommons.getInstance().build20StrongCat("CON");
    }

    public String getParentUID() {
        return parentUID;
    }

    public void setParentUID(String parent) {
        this.parentUID = parent;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getConcordanceString() {
        return concordanceString;
    }

    public void setConcordanceString(String concordanceString) {
        this.concordanceString = concordanceString;
    }

    public List<TokenObject> getConcordance() {
        return concordance;
    }

    public void setConcordance(List<TokenObject> concordance) {
        this.concordance = concordance;
    }

    public void addConcordance(TokenObject token){
        this.concordance.add(token);
        if(null != token.getXmlTag() && token.getXmlTag().equalsIgnoreCase("enamex")){
            this.hasLocation = true;
        }
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getTermIndex() {
        return termIndex;
    }

    public void setTermIndex(int termIndex) {
        this.termIndex = termIndex;
    }

    public int getEndIndex() {
        return endIndex;
    }

    public void setEndIndex(int endIndex) {
        this.endIndex = endIndex;
    }

    public boolean hasLocation(){
        return this.hasLocation;
    }

    public String getConcordanceStringLeading() {
        return concordanceStringLeading;
    }

    public void setConcordanceStringLeading(String concordanceStringLeading) {
        this.concordanceStringLeading = concordanceStringLeading;
    }

    public String getConcordanceStringTrailing() {
        return concordanceStringTrailing;
    }

    public void setConcordanceStringTrailing(String concordanceStringTrailing) {
        this.concordanceStringTrailing = concordanceStringTrailing;
    }

}
