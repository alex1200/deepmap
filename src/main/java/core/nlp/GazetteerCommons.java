package core.nlp;

import Commons.uid.UIDCommons;
import NLPCommons.GeoParse.GazetteerObject;
import NLPCommons.GeoParse.GeoParseCommon;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.File;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GazetteerCommons {
    public String DIRECTORY = "Gazetteers";
    public static GazetteerCommons _instance = new GazetteerCommons();

    public GazetteerCommons(){
    }

    public static GazetteerCommons getInstance(){
        return _instance;
    }

    public List<GazetteerObject> getGazetteers(){
        File file = new File(DIRECTORY);
        Gson gson = new Gson();
        List<GazetteerObject> listGazetteers = new ArrayList<>();
        for(File inFile : file.listFiles()){
            try {
                JsonObject j = new JsonParser().parse(new FileReader(inFile)).getAsJsonObject();
                GazetteerObject gazetteerObject = gson.fromJson(j, GazetteerObject.class);
                listGazetteers.add(gazetteerObject);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return listGazetteers;
    }

    public List<GazetteerObject> getGazetteersByID(List<String> gazUIDs){
        List<GazetteerObject> allGaz = getGazetteers();
        List<GazetteerObject> returnGaz = new ArrayList<>();
        for(GazetteerObject object: allGaz){
            if(gazUIDs.contains(object.getUid()) == true){
                returnGaz.add(object);
            }
        }
        return returnGaz;
    }

    public void saveGazetteer(String name, GazetteerObject object){
        try {
            Gson gson = new Gson();
            PrintWriter writer = new PrintWriter(DIRECTORY + "/" + name + ".txt", "UTF-8");
            String json = gson.toJson(object);
            writer.print(json);
            writer.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void saveGazetteer(String uid, String name, String inFile, String hasColumnHeaders, String inLocationName, String inLatColumn, String inLongColumn, String lineDelimiter,String columnDelimiter){
        try {
            GazetteerObject object = new GazetteerObject(new File(inFile), inLocationName, inLatColumn, inLongColumn,null, null);
            object.setUid(uid);
            object.setHasColumnHeaders(Boolean.valueOf(hasColumnHeaders));
            object.setLineDelimiter(lineDelimiter);
            object.setColumnDelimiter(columnDelimiter);
            object.setFilepath(inFile);
            object.setGazetteerName(name);

            Gson gson = new Gson();
//            new File(DIRECTORY).mkdirs();
            PrintWriter writer = new PrintWriter(DIRECTORY + "/" + uid + ".txt", "UTF-8");
            String json = gson.toJson(object);
            writer.print(json);
            writer.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String uid = UIDCommons.getInstance().build20StrongCat("GAZ");
        GazetteerCommons.getInstance().saveGazetteer(uid,"UK_NGA",new File(GazetteerCommons.class.getClassLoader().getResource("uk.txt").getFile()).getPath(),"TRUE","FULL_NAME_RO","LAT","LONG","\n", "\t");
//        GeoParseCommon.getInstance().loadGazetteer(new File(getClass().getClassLoader().getResource("uk.txt").getFile()),"FULL_NAME_RO","LAT","LONG", "\n", "\t");
        List<GazetteerObject> gaz = GazetteerCommons.getInstance().getGazetteers();
        System.out.println(gaz);

    }
}

