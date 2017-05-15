package core.crosthwaite;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.File.FileCommons;
import Commons.Server.AbstractServerResource;
import org.restlet.representation.Representation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;
import java.util.Scanner;

public class TextDetailResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        String textUID = getAttribute("textUID");
        int start = Integer.parseInt(getAttribute("start"));
        int end = Integer.parseInt(getAttribute("end"));

        String text = "";
        try {
            List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`crosthwaithe_text_meta` WHERE text_id=" + textUID);
            if (null != table) {
                DBRow row = table.get(0);
                String fileName = String.valueOf(row.row.get(4).getKey());

                ClassLoader classLoader = getClass().getClassLoader();
                File file = new File(classLoader.getResource(fileName).getFile());
                if(end != 0) {
                    DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                    Document doc = dBuilder.parse(file);

                    doc.getDocumentElement().normalize();

                    NodeList nList = doc.getElementsByTagName("s");


                    while (start <= end) {
//                    NodeList nList = doc.getElementsByTagName("s"+start);
                        for (int temp = 0; temp < nList.getLength(); temp++) {

                            Node nNode = nList.item(temp);

                            if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                                Element eElement = (Element) nNode;
                                if (eElement.getAttribute("id").equalsIgnoreCase("s" + start)) {

                                    text += nNode.getTextContent();
                                }
                            }
                        }
                        start++;
                    }
                }
                else{
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
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
//        getResponse().setStatus(Status.SUCCESS_OK);
//
        return buildRepresentation(text);
//        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}