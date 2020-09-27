package core.holocaust.text;

import core.holocaust.concordance.TokenObject;
import org.apache.commons.lang3.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.parser.Tag;
import org.jsoup.safety.Whitelist;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander Reinhold on 06/05/2017.
 */
public class TextObject {
    public String UID;
    public String text;
    public TextMetaObject meta;
    public List<TokenObject> tokenList = new ArrayList<>();

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
        tokenizeText();
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    private void tokenizeText() {
        String unsafe = this.text;
        Whitelist whitelist = Whitelist.none();
        whitelist.addTags(new String[]{"enamex"});
        whitelist.addAttributes("enamex", new String[]{"long","lat"});

        String safe = Jsoup.clean(unsafe, whitelist);
        String textLessXML = StringEscapeUtils.unescapeXml(safe);

        Document doc = Jsoup.parse(textLessXML);
        int index = 0;
        for (Element e : doc.select("body")) {
            for (Node child : e.childNodes()) {
                if (child instanceof TextNode) {
                    String textBlock = ((TextNode) child).text();
                    String[] result = textBlock.split("\\s");
                    for(String textToken: result){
                        tokenList.add(new TokenObject(textToken,index));
                        index++;
                    }
                } else {
                    Element element = (Element) child;
                    String textBlock = element.text();
                    Tag tag = element.tag();
                        tokenList.add(new TokenObject(element.toString(),textBlock,tag.toString(),tag,index));
                        index++;

                }
            }
        }
    }

    public TextMetaObject getMeta() {
        return meta;
    }

    public void setMeta(TextMetaObject inMeta) {
        this.meta = inMeta;
    }

    public List<TokenObject> getTokenList() {
        return tokenList;
    }

    public void addToken(TokenObject tokenObject){
        this.tokenList.add(tokenObject);
    }

    public void setTokenList(List<TokenObject> tokenList) {
        this.tokenList = tokenList;
    }
}
