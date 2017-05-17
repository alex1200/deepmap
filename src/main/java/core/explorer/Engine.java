package core.explorer;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Geo.GeoCommon;
import Commons.uid.UIDCommons;
import NLPCommons.GeoParse.GeoParseCommon;
import com.flickr4java.flickr.photos.Photo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import core.explorer.concordance.ConcordanceObject;
import core.explorer.concordance.TokenObject;
import core.explorer.location.MediaObject;
import core.explorer.text.TextMetaObject;
import core.explorer.text.TextObject;
import core.media.Europeana.EuropeanaModule;
import core.media.Europeana.cdo.EuropeanaWrapper;
import core.media.Europeana.cdo.Item;
import core.media.Flickr.FlickrModule;
import core.media.Getty.GettyModule;
import core.media.Getty.cdo.GettyWrapper;
import core.media.Getty.cdo.Image;
import core.media.HarvardArtMuseum.HarvardArtRecord;
import core.media.HarvardArtMuseum.HarvardArtWrapper;
import core.media.HarvardArtMuseum.HarvardModule;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.util.*;

public class Engine {
    public static void main(String[] args) {
        Engine engine = new Engine();
        List<ConcordanceObject> concordanceObjects = engine.search(54.57417972892827, -3.1730026245116916, 10, 10, false);
//        List<ConcordanceObject> concordanceObjects = engine.search("waterfall",10,false);
//        List<ConcordanceObject> concordanceObjects2 = engine.search("waterfall","tourist",10,false);
        //System.out.println(concordanceObjects);
        System.out.println(concordanceObjects);
    }

    public List<TextObject> textlist;
    public Map<String, TextMetaObject> textMetalist;

    public int countHarvard = 0;

    public Engine() {
        initialize();

        loadTexts();
    }

    private void initialize() {
        textlist = new ArrayList<>();
        textMetalist = new HashMap<>();
    }

    public List<TextObject> getTextlist() {
        return textlist;
    }

    public Map<String, TextMetaObject> getTextMetalist() {
        return textMetalist;
    }

    private void loadTexts() {
        DBConnection.getInstance().createConnection("root", "root", "127.0.0.1", 3306, "deepmap");
        DBConnection.getInstance().openConnection();
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`full_metadata`");

        ClassLoader classLoader = getClass().getClassLoader();
        for (DBRow row : table) {
            String uid = UIDCommons.getInstance().build20StrongCat("TEXT");
            TextObject textObject = new TextObject();
            textObject.setUID(uid);
            TextMetaObject textMetaObject = new TextMetaObject(row);
            textMetaObject.setUID(uid);
            textObject.setMeta(textMetaObject);
            String filename = textMetaObject.getFilename1() + ".xml";
            String text = "";
            BufferedReader br = null;
            try {
                br = new BufferedReader(new FileReader(new File(classLoader.getResource(filename).getFile())));
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                    sb.append(line);
                    sb.append(System.lineSeparator());
                    line = br.readLine();
                }
                text = sb.toString();

                br.close();
            } catch (Exception e) {
            }
            textObject.setText(text);
            textMetalist.put(uid, textMetaObject);
            textlist.add(textObject);
        }
    }

    public List<ConcordanceObject> search(String term, int concordanceLimit, boolean fuzzy) {
        List<ConcordanceObject> concordanceList = new ArrayList<>();
        for (TextObject textObject : textlist) {
//            String[] result = textObject.getText().split("\\s");

            for (TokenObject token : textObject.getTokenList()) {
                if ((term.equalsIgnoreCase(token.getWord()) == true && fuzzy == false) || (token.getWord().contains(term) == true && fuzzy == true)) {
                    concordanceList.add(createConcordance(token, textObject, concordanceLimit));
                }
            }
        }
        return concordanceList;
    }

    public List<ConcordanceObject> search(String term, String secondaryTerm, int concordanceLimit, boolean fuzzy) {
        List<ConcordanceObject> resultList = new ArrayList<>();
        List<ConcordanceObject> firstTermList = search(term, concordanceLimit, fuzzy);
        for (ConcordanceObject concordanceObject : firstTermList) {
            if (fuzzy == true) {
                if (concordanceObject.getConcordanceString().contains(secondaryTerm) == true) {
                    resultList.add(concordanceObject);
                }
            } else if (fuzzy == false) {
                for (TokenObject token : concordanceObject.getConcordance()) {
                    if (token.getWord().equalsIgnoreCase(secondaryTerm) == true) {
                        resultList.add(concordanceObject);
                        break;
                    }
                }
            }
        }
        return resultList;
    }

    public List<ConcordanceObject> search(double lat, double lng, double radius, int concordanceLimit, boolean fuzzy) {
        List<ConcordanceObject> concordanceList = new ArrayList<>();
        for (TextObject textObject : textlist) {
            for (TokenObject token : textObject.getTokenList()) {
                if (null != token.getXmlTag() && token.getXmlTag().equalsIgnoreCase("enamex")) {
                    Document doc = Jsoup.parse(token.getFullToken());
                    Elements e = doc.select("enamex");
                    if (null != e.get(0)) {
                        try {
                            double tokenLat = Double.parseDouble(e.attr("lat"));
                            double tokenLng = Double.parseDouble(e.attr("long"));
                            if (GeoCommon.getInstance().inDistance(lat, lng, tokenLat, tokenLng, radius) == true) {
                                concordanceList.add(createConcordance(token, textObject, concordanceLimit));
                            }
                        } catch (Exception exc) {
//                            System.out.println(e.attr("lat") + "," + e.attr("long"));
                        }
                    }
                }
            }
        }
        return concordanceList;
    }

    public ConcordanceObject createConcordance(TokenObject token, TextObject textObject, int concordanceLimit) {
        ConcordanceObject concordance = new ConcordanceObject();
        concordance.setTerm(token.getWord());
        concordance.setTermIndex(token.getIndex());
        concordance.setParentUID(textObject.getUID());

        String text = "";
        String leading = "";
        String trailing = "";
        boolean firstCon = true;
        for (int i = 0; i < (concordanceLimit * 2) + 1; i++) {
            int conIndex = token.getIndex() - (concordanceLimit - i);
            if (conIndex < 0) {
                continue;
            }
            if (firstCon == true) {
                concordance.setStartIndex(conIndex);
                firstCon = false;
            }
            concordance.addConcordance(textObject.getTokenList().get(conIndex));

            concordance.setEndIndex(conIndex);

            text += textObject.getTokenList().get(conIndex).getWord() + " ";
            if (conIndex < token.getIndex()) {
                leading += textObject.getTokenList().get(conIndex).getWord() + " ";
            } else if (conIndex > token.getIndex()) {
                trailing += textObject.getTokenList().get(conIndex).getWord() + " ";
            }
        }
        concordance.setConcordanceString(text);
        concordance.setConcordanceStringLeading(leading);
        concordance.setConcordanceStringTrailing(trailing);

        return concordance;
    }

    public void getFlickr(double lat, double lng, double radius, List<MediaObject> mediaList) {
        FlickrModule flickrModule = new FlickrModule();
        List<Photo> listPhotos = flickrModule.searchLocation(lat, lng, radius);

        for (Photo photo : listPhotos) {
            MediaObject media = new MediaObject();
            media.setUID(UIDCommons.getInstance().build20StrongCat("MED"));
            media.setUrl(photo.getSmallUrl());
            media.setTitle(photo.getTitle());
            media.setDescription(photo.getDescription());
            media.setSource("Flickr");
            media.setSourceURI(photo.getUrl());
            media.setSourceProvider("Flickr");
            if (null != photo.getDateTaken() && photo.getDateTaken().getTime() != 0) {
                media.setStartDate(photo.getDateTaken().getTime());
                if (null != photo.getDateAdded()) {
                    media.setEndDate(photo.getDateAdded().getTime());
                } else {
                    media.setEndDate(photo.getDateTaken().getTime());
                }
            } else if (null != photo.getDateAdded()) {
                media.setStartDate(photo.getDateAdded().getTime());
                media.setEndDate(photo.getDateAdded().getTime());
            }
            media.setLat(photo.getGeoData().getLatitude());
            media.setLng(photo.getGeoData().getLongitude());
            if(checkMediaDup(media,mediaList) == false) {
                mediaList.add(media);
            }
        }
    }

    public void getHarvardArt(String location, List<MediaObject> mediaList) {
        HarvardArtWrapper wrapper = loadHarvard(location);
        if (null == wrapper) {
            countHarvard++;
            System.out.println("MAKING SEARCH TO HARVARD ART MUSEUM (Count:" + countHarvard + ")");
            HarvardModule harvardModule = new HarvardModule();
            wrapper = harvardModule.searchLocation(location);
            saveHarvard(location, wrapper);
        }
        for (HarvardArtRecord record : wrapper.getRecords()) {
            MediaObject media = new MediaObject();
            media.setSource("HarvardArt");
            media.setSourceURI(record.getUrl());
            media.setSourceProvider("Harvard Art Museums");
            media.setTitle(record.getTitle());
            media.setDescription(record.getDescription());
            try {
                Date date = new Date();
                date.setYear(record.getDatebegin());
                media.setStartDate(date.getTime());//This is the year
                date.setYear(record.getDateend());
                media.setEndDate(date.getTime());
            } catch (Exception e) {

            }
            media.setUID(UIDCommons.getInstance().build20StrongCat("MED"));
            try {
                media.setUrl(record.getImages().get(0).getBaseimageurl());
            } catch (Exception e) {

            }
            if(checkMediaDup(media,mediaList) == false) {
                mediaList.add(media);
            }
        }

    }

    public void saveHarvard(String location, HarvardArtWrapper wrapper) {
        try {
            String savedFilename = "HarvardArt/" + location + ".json";
            File dir = new File("HarvardArt/");
            dir.mkdirs();
            File file = new File("HarvardArt/" + location + ".json");
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            bw.write(new Gson().toJson(wrapper));
            bw.close();
        } catch (Exception e) {

        }
    }

    public HarvardArtWrapper loadHarvard(String location) {
        String savedFilename = "HarvardArt/" + location + ".json";
        File file = new File(savedFilename);
        if (file.exists() == true) {
            try {
                JsonObject j = new JsonParser().parse(new FileReader(file)).getAsJsonObject();
                HarvardArtWrapper wrapper = new Gson().fromJson(j, HarvardArtWrapper.class);
                return wrapper;
            } catch (Exception e) {
                System.out.println(e);
                return null;
            }
        } else {
            return null;
        }
    }

    public List<String> processLocations(List<ConcordanceObject> concordanceObjects, double lat, double lng, double radius) {
        List<String> locations = new ArrayList<>();
// add elements to al, including duplicates
        Set<String> hs = new HashSet<>();
        for (ConcordanceObject concordance : concordanceObjects) {
            for (TokenObject token : concordance.getConcordance()) {
                if (null != token.getXmlTag() && token.getXmlTag().equalsIgnoreCase("enamex")) {
                    Document doc = Jsoup.parse(token.getFullToken());
                    Elements e = doc.select("enamex");
                    if (null != e.get(0)) {
                        try {
                            double tokenLat = Double.parseDouble(e.attr("lat"));
                            double tokenLng = Double.parseDouble(e.attr("long"));
                            if (GeoCommon.getInstance().inDistance(lat, lng, tokenLat, tokenLng, radius) == true) {
                                hs.add(token.getWord().toLowerCase());
                                token.setInRadius(true);
                            } else {
                                token.setInRadius(false);
                            }
                        } catch (Exception exc) {
//                            System.out.println(e.attr("lat") + "," + e.attr("long"));
                        }
                    }
                    hs.add(token.getWord().toLowerCase());
                }
            }
        }
        locations.addAll(hs);//Remove Duplicates by adding to set then adding to list
        return locations;
    }

    public void getEuropeana(double lat, double lng, double radius, List<MediaObject> mediaList){
        EuropeanaModule module = new EuropeanaModule();
        EuropeanaWrapper wrapper = module.searchLocation(lat,lng,radius);

        for(Item item : wrapper.getItems()){
            MediaObject media = new MediaObject();
            media.setUID(UIDCommons.getInstance().build20StrongCat("MED"));
            media.setUrl(item.getGuid());
            media.setTitle(item.getTitle().get(0));
            media.setDescription(item.getType());
            media.setSource("Europeana");
            media.setSourceURI(item.getLink());
            media.setSourceProvider("Europeana");
            if(checkMediaDup(media,mediaList) == false) {
                mediaList.add(media);
            }
        }
    }
    public void getGetty(String location, List<MediaObject> mediaList) {
        GettyModule module = new GettyModule();
        GettyWrapper wrapper = module.searchLocation(location);

        for (Image image : wrapper.getImages()) {
            MediaObject media = new MediaObject();
            media.setUID(UIDCommons.getInstance().build20StrongCat("MED"));
            media.setUrl(image.getDisplaySizes().get(0).getUri());
            media.setTitle(image.getTitle());
            media.setDescription(image.getCaption());
            media.setSource("Getty");
            media.setSourceURI(image.getDisplaySizes().get(0).getUri());
            media.setSourceProvider("Getty Images");
            media.setStartDate(0);
            media.setEndDate(0);
            media.setLat(0);
            media.setLng(0);
            if(checkMediaDup(media,mediaList) == false) {
                mediaList.add(media);
            }
        }
    }

    private boolean checkMediaDup(MediaObject media, List<MediaObject> mediaList){
        for(MediaObject mediaObject : mediaList){
            if(mediaObject.getUrl().equalsIgnoreCase(media.getUrl())){
                return true;
            }
        }
        return false;
    }
}
