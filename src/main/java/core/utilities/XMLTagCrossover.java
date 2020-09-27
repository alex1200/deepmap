package core.utilities;

import Commons.Geo.GeoCommon;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Alexander on 5/19/2017.
 */
public class XMLTagCrossover {
    public static void main(String[] args) {
        XMLTagCrossover repair = new XMLTagCrossover();
        repair.run(new File(repair.getClass().getClassLoader().getResource("West1778_a.xml").getPath()),new File(repair.getClass().getClassLoader().getResource("West_cqp_17.xml").getPath()), "pb");
    }
    public void run(File origFile, File geoFile, String tag){
        try {
            String input = getText(origFile);
            String origText = input.replaceAll("&#8747;", "s");
            String geoText = getText(geoFile);

//            boolean moreTags = true;
//            int lastIndexGeoText = 0;
//            int lastIndexOrigText = 0;
            Map<String,Integer> indexMap = new HashMap<>();

            Document doc = Jsoup.parse(geoText);
            Elements elements = doc.select("enamex");
            for(Element element : elements){
                String location = element.text();
                int lastIndex = 0;
                if(indexMap.containsKey(location)==true){
                    lastIndex = indexMap.get(location);
                }
                int startIndex = origText.toLowerCase().indexOf(location.toLowerCase(),lastIndex);
                if(startIndex == -1){
                    System.out.println("Enamex Tag not found at index "+ lastIndex + " - " + location);
                    System.out.println(element.toString());
                    continue;
                }
                int endIndex = startIndex + location.length();
//                System.out.println(element.toString() + " ---" + startIndex +","+endIndex);
                origText = origText.substring(0,startIndex) + element.toString() + origText.substring(endIndex,origText.length());
//                lastIndexOrigText = startIndex;
                indexMap.put(location,endIndex);
            }
//            while (moreTags == true){
//                String tagString = origText.substring(startIndex,endIndex+1);
////                String stripped = origText.replaceAll("<[^>]*>","");
////                String tagString = origText.substring(startIndex,endIndex+1);
//
//                String preString = origText.substring(startIndex-10,startIndex).replaceAll("<[^>]*>","")
//                        .replaceAll("\r","").replaceAll("\n","");
//                String postString = origText.substring(endIndex,endIndex+10).replaceAll("<[^>]*>","")
//                        .replaceAll("\r","").replaceAll("\n","");
//                if(preString.length() == 0 || preString.contains(">")){
//                    preString = origText.substring(startIndex-20,startIndex).replaceAll("<[^>]*>","")
//                            .replaceAll("\r","").replaceAll("\n","");
//                    if(preString.length() == 0 || preString.contains(">")){
//                        preString = origText.substring(startIndex-30,startIndex).replaceAll("<[^>]*>","")
//                                .replaceAll("\r","").replaceAll("\n","");
//                    }
//                }
//                if(postString.length() == 0 || postString.contains("<")){
//                    postString = origText.substring(endIndex,endIndex+20).replaceAll("<[^>]*>","")
//                            .replaceAll("\r","").replaceAll("\n","");
//                    if(postString.length() == 0 || postString.contains("<")){
//                        postString = origText.substring(endIndex,endIndex+30).replaceAll("<[^>]*>","")
//                                .replaceAll("\r","").replaceAll("\n","");
//                    }
//                }
//                int insertIndex = newText.indexOf(preString,lastIndexNewText);
//                if(insertIndex == -1 || preString.equalsIgnoreCase("")){
//                    insertIndex = newText.indexOf(postString,lastIndexNewText);
//                    if(insertIndex == -1){
//                        System.out.println("Cant find location for tag "+ tagString);
//                    }
//                    else{
//                        //insertIndex+=postString.length();
//                    }
//                }
//                else{
//                    insertIndex+=preString.length();
//                }
//                if(insertIndex != -1){
//                    newText = newText.substring(0,insertIndex) + tagString + newText.substring(insertIndex,newText.length());
//                }
//                lastIndexorigText = endIndex;
//                lastIndexNewText = insertIndex;
//
//            }
            String savedFilename = origFile.getName();
            File dir = new File("NewXML/");
            dir.mkdirs();
            File file = new File("NewXML/", savedFilename);
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            String l;
            bw.write(origText);

            bw.close();

//            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
//            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
//            Document doc = dBuilder.parse(oldFile);
//
//            doc.getDocumentElement().normalize();
//
//            DocumentBuilderFactory dbNewFactory = DocumentBuilderFactory.newInstance();
//            DocumentBuilder dNewBuilder = dbNewFactory.newDocumentBuilder();
//            Document newDoc = dNewBuilder.parse(newFile);
//
//            newDoc.getDocumentElement().normalize();
//
//            NodeList nList = doc.getElementsByTagName(tag);
//
//            for(int i = 0; i < nList.getLength(); i++){
//                Node node = nList.item(i);
//                node.getParentNode();
//
//            }


        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    public String getText(File file){
        String text;
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(file));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }
        try
        {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();

            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
                line = br.readLine();
            }
            text = sb.toString();

            br.close();
        }
        catch (Exception e)
        {
            return null;
        }
        return text;
    }
}
