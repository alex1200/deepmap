//package core.nlp;
//
//import Commons.DB.DBConnection;
//import Commons.Server.AbstractServerResource;
//
//import Commons.uid.UIDCommons;
//import NLPCommons.GeoParse.GazetteerLocationMatch;
//import NLPCommons.GeoParse.GeoParseCommon;
//import NLPCommons.NERObject;
//import NLPCommons.NLPCommon;
//import com.google.gson.*;
//import edu.stanford.nlp.ling.CoreLabel;
//import org.apache.commons.fileupload.FileItemIterator;
//import org.apache.commons.fileupload.FileItemStream;
//import org.apache.commons.fileupload.disk.DiskFileItemFactory;
//import org.eclipse.jetty.util.thread.ThreadPool;
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.restlet.data.Form;
//import org.restlet.data.MediaType;
//import org.restlet.data.Status;
//import org.restlet.ext.fileupload.RestletFileUpload;
//import org.restlet.representation.Representation;
//import org.restlet.representation.StringRepresentation;
//import org.restlet.resource.ResourceException;
//
//
//import java.io.*;
//import java.nio.charset.Charset;
//import java.nio.file.*;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class NLPResource extends AbstractServerResource {
//
//    private String DIRECTORY = "NLPTexts";
//
//    @Override
//    protected Representation processGet(Representation representation) {
//        String textUID = getAttribute("textUID");
//        int start = Integer.parseInt(getAttribute("start"));
//        int end = Integer.parseInt(getAttribute("end"));
//
//        Representation rep = new StringRepresentation("");
//        return rep;
//    }
//
//    @Override
//    protected Representation processPost(Representation representation) {
//        if (representation != null && MediaType.MULTIPART_FORM_DATA.equals(
//                representation.getMediaType(), true)) {
//
//            String uid = UIDCommons.getInstance().build20StrongCat("NLP");
//            String savedFilename = "temp.txt";
//            String saveFilePath = DIRECTORY + "/"+uid+"/temp.txt";
//            String text = "";
//            String name = "";
//            boolean tokenize = true;
//            boolean ssplit = true;
//            boolean pos = true;
//            boolean lemma = true;
//            boolean ner = true;
//            boolean regexner = true;
//            boolean parse = true;
//            boolean dcoref = true;
//            boolean sentiment = true;
//            List<String> gazUIDs = new ArrayList<>();
//            try {
//                DiskFileItemFactory factory = new DiskFileItemFactory();
//                factory.setSizeThreshold(1000240);
//                RestletFileUpload upload = new RestletFileUpload(factory);
//                FileItemIterator fileIterator = upload.getItemIterator(representation);
//                boolean fileUploaded = false;
//                while (fileIterator.hasNext()) {
//                    FileItemStream fi = fileIterator.next();
//                    String fieldName = fi.getFieldName();
//                    if(fieldName.equalsIgnoreCase("fileUpload")) {
//                        String contentType = fi.getContentType();
//                        String fileName = "temp.txt";
//                        if (!fi.isFormField()) {
//                            fileName = fi.getName();
//                        }
//                        BufferedReader br = new BufferedReader(
//                                new InputStreamReader(fi.openStream()));
//                        savedFilename = fileName;
//                        name = fileName;
//                        saveFilePath = DIRECTORY + "/" + uid + "/" + fileName;
//                        File dir = new File(DIRECTORY + "/" + uid + "/");
//                        dir.mkdirs();
//                        File file = new File(DIRECTORY + "/" + uid + "/", fileName);
//                        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
//                        String l;
//                        while ((l = br.readLine()) != null) {
//                            text+=l;
//                            bw.write(l);
//
//                        }
//
//                        bw.close();
//                        fileUploaded = true;
//                    }
//                    else if(fieldName.contains("checkbox_")){
//                        String gaz = fieldName.replace("checkbox_","");
//                        if(getString(fi).equalsIgnoreCase("on")){
//                            gazUIDs.add(gaz);
//                        }
//                    }
//                    else if(fieldName.equalsIgnoreCase("textAreaInput") && fileUploaded == false){
//                        String path = DIRECTORY + "/" + uid + "/";
//                        text = getString(fi);
//                        String filename = name + ".txt";
//                        PrintWriter writer = new PrintWriter(path + filename, "UTF-8");
//                        writer.print(text);
//                        writer.close();
//                    }
//
//
//
//                    DBConnection.getInstance().insertDB("INSERT INTO `deepmap`.`nlp_text` (`uid`, `filename`, `path`, `startTime`, `endTime`) VALUES ('" + uid + "', '" + savedFilename + "', '" + saveFilePath + "', '" + System.currentTimeMillis() + "', '0');");
//                //Recognizes named (PERSON, LOCATION, ORGANIZATION, MISC), numerical (MONEY, NUMBER, ORDINAL, PERCENT), and temporal (DATE, TIME, DURATION, SET) entities.
//                    run (uid,text, tokenize, ssplit, pos, lemma, ner, regexner, parse, dcoref, sentiment,gazUIDs);
//
//                    System.out.println("Sending back UID:  " + uid);
//                return buildRepresentationJson("UID:"+uid);
//                }
//
//            }
//            catch (Exception e){
//                e.printStackTrace();
//            }
//        }
//
//
//        return new StringRepresentation("");
//
////        else {
////            String s = null;
////            try {
////                Gson gson = new Gson();
////                s = representation.getText();
////                JsonObject j = new JsonParser().parse(s).getAsJsonObject();
////                JsonElement text = j.get("text");
////                JsonElement name = j.get("name");
////                boolean tokenize = j.get("tokenize").getAsBoolean();
////                boolean ssplit = j.get("ssplit").getAsBoolean();
////                boolean pos = j.get("pos").getAsBoolean();
////                boolean lemma = j.get("lemma").getAsBoolean();
////                boolean ner = j.get("ner").getAsBoolean();
////                boolean regexner = j.get("regexner").getAsBoolean();
////                boolean parse = j.get("parse").getAsBoolean();
////                boolean dcoref = j.get("dcoref").getAsBoolean();
////                boolean sentiment = j.get("sentiment").getAsBoolean();
////                JsonArray gazetteers = j.get("gazetteers").getAsJsonArray();
////                List<String> gazUIDs = new ArrayList<>();
////                for (JsonElement gaz : gazetteers) {
////                    gazUIDs.add(gaz.getAsString());
////                }
////
////                System.out.println(text.getAsString());
////
////                String uid = UIDCommons.getInstance().build20StrongCat("NLP");
////
////                String path = DIRECTORY + "/" + uid + "/";
////                String filename = name.getAsString() + ".txt";
////                PrintWriter writer = new PrintWriter(path + filename, "UTF-8");
////                writer.print(text.getAsString());
////                writer.close();
////
////                DBConnection.getInstance().insertDB("INSERT INTO `deepmap`.`nlp_text` (`uid`, `filename`, `path`, `startTime`, `endTime`) VALUES ('" + uid + "', '" + filename + "', '" + path + "', '" + System.currentTimeMillis() + "', '0');");
////                //Recognizes named (PERSON, LOCATION, ORGANIZATION, MISC), numerical (MONEY, NUMBER, ORDINAL, PERCENT), and temporal (DATE, TIME, DURATION, SET) entities.
////
////                NLPCommon common = new NLPCommon(text.getAsString(), tokenize, ssplit, pos, lemma, ner, regexner, parse, dcoref, sentiment);
////
////                DBConnection.getInstance().insertDB("UPDATE `deepmap`.`nlp_text` SET `endTime`='" + System.currentTimeMillis() + "' WHERE `uid`='" + uid + "';");
////
////                writer = new PrintWriter(path + "GAZETTEER" + ".txt", "UTF-8");
////                String json = gson.toJson(gazUIDs);
////                writer.print(json);
////                writer.close();
////
////                StringBuilder sb = new StringBuilder("{");
////                List<NERObject> people = common.getPeopleList();
////                save(path, gson, people, "PEOPLE", sb, ",");
////                List<NERObject> organizations = common.getOrganizationsList();
////                save(path, gson, organizations, "ORGANIZATIONS", sb, ",");
////                List<NERObject> misc = common.getMiscsList();
////                save(path, gson, misc, "MISC", sb, ",");
////
////                List<NERObject> money = common.getMoneyList();
////                save(path, gson, money, "MONEY", sb, ",");
////                List<NERObject> number = common.getNumbersList();
////                save(path, gson, number, "NUMBER", sb, ",");
////                List<NERObject> ordinal = common.getOrdinalsList();
////                save(path, gson, ordinal, "ORDINAL", sb, ",");
////                List<NERObject> percents = common.getPercentsList();
////                save(path, gson, percents, "PERCENTS", sb, ",");
////
////                List<NERObject> dates = common.getDatesList();
////                save(path, gson, dates, "DATE", sb, ",");
////                List<NERObject> times = common.getTimesList();
////                save(path, gson, times, "TIMES", sb, ",");
////                List<NERObject> durations = common.getDurationsList();
////                save(path, gson, durations, "DURATIONS", sb, ",");
////                List<NERObject> sets = common.getSetsList();
////                save(path, gson, sets, "SETS", sb, ",");
////
////                List<NERObject> idealogies = common.getIdealogiesList();
////                save(path, gson, idealogies, "IDEALOGIES", sb, ",");
////                List<NERObject> religions = common.getReligionsList();
////                save(path, gson, religions, "RELIGIONS", sb, ",");
////                List<NERObject> nationalities = common.getNationalitiesList();
////                save(path, gson, nationalities, "NATIONALITIES", sb, ",");
////                List<NERObject> titles = common.getTitlesList();
////                save(path, gson, titles, "TITLES", sb, ",");
////
////                Map<String, String> sentimentList = common.getSentiment();
////                save(path, gson, sentimentList, "SENTIMENT", sb, ",");
////
////
////                List<NERObject> locations = common.getLocationsList();
////                save(path, gson, locations, "RAWLOCATIONS", sb, ",");
////                Map<String, List<List<CoreLabel>>> rawLocations = common.getLocations();
////
////                Map<String, List<GazetteerLocationMatch>> locationMatches = new HashMap<>();
//////            GeoParseCommon.getInstance().loadGazetteer(new File(getClass().getClassLoader().getResource("uk.txt").getFile()),"FULL_NAME_RO","LAT","LONG", "\n", "\t");
////                GeoParseCommon.getInstance().loadGazetteer(GazetteerCommons.getInstance().getGazetteersByID(gazUIDs));
////                for (Map.Entry<String, List<List<CoreLabel>>> entry : rawLocations.entrySet()) {
////
////                    List<GazetteerLocationMatch> matches = GeoParseCommon.getInstance().findLocation(entry.getKey());
////                    locationMatches.put(entry.getKey(), matches);
////                }
////                save(path, gson, locationMatches, "LOCATIONS", sb, "");
////                sb.append("}");
////                System.out.println("Return: " + sb.toString());
////                return buildRepresentationJson(sb.toString());
////
////            } catch (IOException e) {
////                e.printStackTrace();
////            }
////
////            Representation rep = new StringRepresentation("");
////            return rep;
////        }
//    }
//
//    public void save(String path, Gson gson, Object objectList, String type, StringBuilder sb, String append){
//        try {
//            PrintWriter writer = new PrintWriter(path + type + ".txt", "UTF-8");
//            String json = gson.toJson(objectList);
//            writer.print(json);
//            writer.close();
//
//            sb.append("\""+type.toLowerCase()+"\":");
//            sb.append(json);
//            sb.append(append);
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
//    }
//
//    public String getString(FileItemStream fi){
//        try {
//            StringBuilder sb = new StringBuilder();
//            BufferedReader br = new BufferedReader(new InputStreamReader(fi.openStream()));
//            String line = null;
//            while ((line = br.readLine()) != null) {
//                sb.append(line);
//            }
//            return sb.toString();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
//        return "";
//    }
//
//    private void run(final String uid, final String text, final boolean tokenize, final boolean ssplit, final boolean pos, final boolean lemma, final boolean ner, final boolean regexner, final boolean parse, final boolean dcoref, final boolean sentiment, final List<String> gazUIDs){
//        System.out.println(" Run Running");
//        Runnable process = new Runnable() {
//            @Override
//            public void run() {
//                runnable(uid,text, tokenize, ssplit, pos, lemma, ner, regexner, parse, dcoref, sentiment,gazUIDs);
//            }
//        };
//        Thread t = new Thread(process);
//        t.start();
////        t.run();
//
//    }
//
//    private void runnable(String uid, String text, boolean tokenize, boolean ssplit, boolean pos, boolean lemma, boolean ner, boolean regexner, boolean parse, boolean dcoref, boolean sentiment, List<String> gazUIDs){
//        try {
//            System.out.println("Thread Running");
//
//            NLPCommon common = new NLPCommon(text, tokenize, ssplit, pos, lemma, ner, regexner, parse, dcoref, sentiment);
//
//
//            Gson gson = new Gson();
//            String path = DIRECTORY + "/" + uid + "/";
//            PrintWriter writer = new PrintWriter(path + "GAZETTEERS" + ".txt", "UTF-8");
//            String json = gson.toJson(gazUIDs);
//            writer.print(json);
//            writer.close();
//
//            StringBuilder sb = new StringBuilder("{");
//            List<NERObject> people = common.getPeopleList();
//            save(path, gson, people, "PEOPLE", sb, ",");
//            List<NERObject> organizations = common.getOrganizationsList();
//            save(path, gson, organizations, "ORGANIZATIONS", sb, ",");
//            List<NERObject> misc = common.getMiscsList();
//            save(path, gson, misc, "MISC", sb, ",");
//
//            List<NERObject> money = common.getMoneyList();
//            save(path, gson, money, "MONEY", sb, ",");
//            List<NERObject> number = common.getNumbersList();
//            save(path, gson, number, "NUMBER", sb, ",");
//            List<NERObject> ordinal = common.getOrdinalsList();
//            save(path, gson, ordinal, "ORDINAL", sb, ",");
//            List<NERObject> percents = common.getPercentsList();
//            save(path, gson, percents, "PERCENTS", sb, ",");
//
//            List<NERObject> dates = common.getDatesList();
//            save(path, gson, dates, "DATE", sb, ",");
//            List<NERObject> times = common.getTimesList();
//            save(path, gson, times, "TIMES", sb, ",");
//            List<NERObject> durations = common.getDurationsList();
//            save(path, gson, durations, "DURATIONS", sb, ",");
//            List<NERObject> sets = common.getSetsList();
//            save(path, gson, sets, "SETS", sb, ",");
//
//            List<NERObject> idealogies = common.getIdealogiesList();
//            save(path, gson, idealogies, "IDEALOGIES", sb, ",");
//            List<NERObject> religions = common.getReligionsList();
//            save(path, gson, religions, "RELIGIONS", sb, ",");
//            List<NERObject> nationalities = common.getNationalitiesList();
//            save(path, gson, nationalities, "NATIONALITIES", sb, ",");
//            List<NERObject> titles = common.getTitlesList();
//            save(path, gson, titles, "TITLES", sb, ",");
//
//            Map<String, String> sentimentList = common.getSentiment();
//            save(path, gson, sentimentList, "SENTIMENT", sb, ",");
//
//
//            List<NERObject> locations = common.getLocationsList();
//            save(path, gson, locations, "RAWLOCATIONS", sb, ",");
//            Map<String, List<List<CoreLabel>>> rawLocations = common.getLocations();
//
//            Map<String, List<GazetteerLocationMatch>> locationMatches = new HashMap<>();
////            GeoParseCommon.getInstance().loadGazetteer(new File(getClass().getClassLoader().getResource("uk.txt").getFile()),"FULL_NAME_RO","LAT","LONG", "\n", "\t");
//            GeoParseCommon.getInstance().loadGazetteer(GazetteerCommons.getInstance().getGazetteersByID(gazUIDs));
//
//            DBConnection.getInstance().insertDB("UPDATE `deepmap`.`nlp_text` SET `endTime`='" + System.currentTimeMillis() + "' WHERE `uid`='" + uid + "';");
//
//            for (Map.Entry<String, List<List<CoreLabel>>> entry : rawLocations.entrySet()) {
//
//                List<GazetteerLocationMatch> matches = GeoParseCommon.getInstance().findLocation(entry.getKey());
//                locationMatches.put(entry.getKey(), matches);
//            }
//            save(path, gson, locationMatches, "LOCATIONS", sb, "");
//            sb.append("}");
//            System.out.println("Return: " + sb.toString());
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
//    }
//
//}