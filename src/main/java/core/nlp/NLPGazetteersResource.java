package core.nlp;

import Commons.Server.AbstractServerResource;
import Commons.uid.UIDCommons;
import NLPCommons.GeoParse.GazetteerObject;
import NLPCommons.GeoParse.GeoParseCommon;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.restlet.data.MediaType;
import org.restlet.data.Status;
import org.restlet.ext.fileupload.RestletFileUpload;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.ResourceException;

import java.io.*;
import java.util.List;

public class NLPGazetteersResource  extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        List<GazetteerObject> gazetteerObjectList = GazetteerCommons.getInstance().getGazetteers();

        Gson gson = new Gson();
        String json = gson.toJson(gazetteerObjectList);
        Representation rep = new StringRepresentation(json);
        return rep;
    }

    @Override
    protected Representation processPost(Representation representation) {
        if (representation != null && MediaType.MULTIPART_FORM_DATA.equals(
                representation.getMediaType(), true)) {

            String uid = UIDCommons.getInstance().build20StrongCat("GAZ");
            String savedFilename = "GazetteerData/"+uid+"/temp.txt";

            String gazName = "";
            String hasColumnHeaders = "";
            String locationColumn = "";
            String latColumn = "";
            String longColumn = "";
            String lineDelimiter = "";
            String columnDelimiter = "";
            try {
                DiskFileItemFactory factory = new DiskFileItemFactory();
                factory.setSizeThreshold(1000240);
                RestletFileUpload upload = new RestletFileUpload(factory);
                FileItemIterator fileIterator = upload.getItemIterator(representation);
                while (fileIterator.hasNext()) {
                    FileItemStream fi = fileIterator.next();
                    String fieldName = fi.getFieldName();
                    if(fieldName.equalsIgnoreCase("fileUpload")) {
                        String contentType = fi.getContentType();
                        String fileName = "temp.txt";
                        if (!fi.isFormField()) {
                            fileName = fi.getName();
                        }
                        BufferedReader br = new BufferedReader(
                                new InputStreamReader(fi.openStream()));
                        savedFilename = "GazetteerData/" + uid + "/" + fileName;
                        File dir = new File("GazetteerData/" + uid + "/");
                        dir.mkdirs();
                        File file = new File("GazetteerData/" + uid + "/", fileName);
                        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
                        String l;
                        while ((l = br.readLine()) != null) {
                            bw.write(l);

                        }

                        bw.close();
                    }
                    else if(fieldName.equalsIgnoreCase("gazName")){
                        gazName = getString(fi);
                    }
                    else if(fieldName.equalsIgnoreCase("hasColumnHeaders")){
                        if(getString(fi).equalsIgnoreCase("on") == true){
                            hasColumnHeaders = "TRUE";
                        }
                        hasColumnHeaders = "FALSE";
                    }
                    else if(fieldName.equalsIgnoreCase("locationColumn")){
                        locationColumn = getString(fi);
                    }
                    else if(fieldName.equalsIgnoreCase("latColumn")){
                        latColumn = getString(fi);
                    }
                    else if(fieldName.equalsIgnoreCase("longColumn")){
                        longColumn = getString(fi);
                    }
                    else if(fieldName.equalsIgnoreCase("lineDelimiter")){
                        lineDelimiter = getString(fi);
                    }
                    else if(fieldName.equalsIgnoreCase("columnDelimiter")){
                        columnDelimiter = getString(fi);
                    }
                }

                GazetteerCommons.getInstance().saveGazetteer(uid, gazName, savedFilename, hasColumnHeaders, locationColumn,
                        latColumn, longColumn, lineDelimiter, columnDelimiter);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        } else {
            throw new ResourceException(
                    Status.CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE);
        }


        return new StringRepresentation("");
    }

    public String getString(FileItemStream fi){
        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader br = new BufferedReader(new InputStreamReader(fi.openStream()));
            String line = null;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            return sb.toString();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "";
    }
}