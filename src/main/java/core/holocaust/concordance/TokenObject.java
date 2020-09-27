package core.holocaust.concordance;

import org.jsoup.parser.Tag;

/**
 * Created by Alexander Reinhold on 10/05/2017.
 */
public class TokenObject {
    public String fullToken;
    public String word;
    public int index;
    public String xmlTag;
    public Tag tag;
    public boolean inRadius = true;

    public TokenObject(String inFullToken, int inIndex){
        fullToken = inFullToken;
        word = inFullToken;
        index = inIndex;
    }

    public TokenObject(String inFullToken, String inWord, String inXMLTag, Tag inTag, int inIndex){
        fullToken = inFullToken;
        word = inWord;
        xmlTag = inXMLTag;
        index = inIndex;
        tag = inTag;
    }

    public String getFullToken() {
        return fullToken;
    }

    public String getWord() {
        return word;
    }

    public int getIndex() {
        return index;
    }

    public String getXmlTag() {
        return xmlTag;
    }

    public Tag getTag() {
        return tag;
    }


    public boolean isInRadius() {
        return inRadius;
    }

    public void setInRadius(boolean inRadius) {
        this.inRadius = inRadius;
    }
}
