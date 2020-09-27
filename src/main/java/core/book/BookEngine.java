package core.book;

import Commons.Geo.GeoCommon;
import com.google.gson.Gson;
import core.ServerManager;
import core.explorer.Engine;
import core.explorer.text.TextObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.List;

public class BookEngine {
    public Engine engine;
    public BookEngine(){
        engine = new Engine();
    }

    public PageObject getPage(String textUID, int pageNum){

        return null;
    }

//    public TextObject getNavigationText(String textUID, String startLoc, double lat, double lng){
//        List<TextObject> textList = engine.getTextlist();
//        TextObject textObject = null;
//        for(TextObject text : textList){
//            if(text.getUID().equalsIgnoreCase(textUID)){
//                textObject = text;
//                break;
//            }
//        }
//        String origXML = textObject.getText();
//        Document doc = Jsoup.parse(origXML);
//        Elements elements = doc.select("enamex");
//        for(Element element : elements){
//            if(element.hasAttr("lat") == true && element.hasAttr("long") == true) {
//                double tokenLat = Double.parseDouble(element.attr("lat"));
//                double tokenLng = Double.parseDouble(element.attr("long"));
//                if (GeoCommon.getInstance().inDistance(lat, lng, tokenLat, tokenLng, radius) == true) {
//
//                } else {
//                    token.setInRadius(false);
//                }
//            }
//        }
//    }

}
