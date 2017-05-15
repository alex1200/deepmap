package core.utilities;

import org.apache.commons.lang3.StringEscapeUtils;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.text.Normalizer;

public class XMLTagRepair {
    public static void main(String[] args) {
        XMLTagRepair repair = new XMLTagRepair();
        repair.run(new File(repair.getClass().getClassLoader().getResource("West1778_a.xml").getPath()),new File(repair.getClass().getClassLoader().getResource("West_cqp_17.xml").getPath()), "pb");
    }
    public void run(File oldFile, File newFile, String tag){
        try {
            String input = getText(oldFile);
            String oldText = input.replaceAll("&#8747;", "s");
            String newText = getText(newFile);

            boolean moreTags = true;
            int lastIndexOldText = 0;
            int lastIndexNewText = 0;
            while (moreTags == true){
                int startIndex = oldText.indexOf("<pb",lastIndexOldText);
                if(startIndex == -1){
                    System.out.println("No more tags found");
                    moreTags = false;
                    break;
                }
                int endIndex = oldText.indexOf(">",startIndex);
                String tagString = oldText.substring(startIndex,endIndex+1);
//                String stripped = oldText.replaceAll("<[^>]*>","");
//                String tagString = oldText.substring(startIndex,endIndex+1);

                String preString = oldText.substring(startIndex-10,startIndex).replaceAll("<[^>]*>","")
                        .replaceAll("\r","").replaceAll("\n","");
                String postString = oldText.substring(endIndex,endIndex+10).replaceAll("<[^>]*>","")
                        .replaceAll("\r","").replaceAll("\n","");
                if(preString.length() == 0 || preString.contains(">")){
                    preString = oldText.substring(startIndex-20,startIndex).replaceAll("<[^>]*>","")
                            .replaceAll("\r","").replaceAll("\n","");
                    if(preString.length() == 0 || preString.contains(">")){
                        preString = oldText.substring(startIndex-30,startIndex).replaceAll("<[^>]*>","")
                                .replaceAll("\r","").replaceAll("\n","");
                    }
                }
                if(postString.length() == 0 || postString.contains("<")){
                    postString = oldText.substring(endIndex,endIndex+20).replaceAll("<[^>]*>","")
                            .replaceAll("\r","").replaceAll("\n","");
                    if(postString.length() == 0 || postString.contains("<")){
                        postString = oldText.substring(endIndex,endIndex+30).replaceAll("<[^>]*>","")
                                .replaceAll("\r","").replaceAll("\n","");
                    }
                }
                int insertIndex = newText.indexOf(preString,lastIndexNewText);
                if(insertIndex == -1 || preString.equalsIgnoreCase("")){
                    insertIndex = newText.indexOf(postString,lastIndexNewText);
                    if(insertIndex == -1){
                        System.out.println("Cant find location for tag "+ tagString);
                    }
                    else{
                        //insertIndex+=postString.length();
                    }
                }
                else{
                    insertIndex+=preString.length();
                }
                if(insertIndex != -1){
                    newText = newText.substring(0,insertIndex) + tagString + newText.substring(insertIndex,newText.length());
                }
                lastIndexOldText = endIndex;
                lastIndexNewText = insertIndex;

            }
            String savedFilename = newFile.getName();
            File dir = new File("NewXML/");
            dir.mkdirs();
            File file = new File("NewXML/", savedFilename);
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            String l;
            bw.write(newText);

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

