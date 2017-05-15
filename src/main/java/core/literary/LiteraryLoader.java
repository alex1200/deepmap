package core.literary;

import Commons.DB.DBConnection;
import Commons.uid.UIDCommons;
import core.literary.cdo.Document;
import core.literary.cdo.Enamex;
import core.literary.cdo.Paragraph;
import core.literary.cdo.Sentence;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.File;

public class LiteraryLoader {

    public LiteraryLoader(){
        try {
            File file = new File("C:\\Users\\reinhola\\Documents\\LakeDistrict\\LD80v5_texts\\Bree_cqp_56.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(Document.class);

            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            Document source = (Document) jaxbUnmarshaller.unmarshal(file);

            String UID = UIDCommons.getInstance().build20StrongCat("LIT");
            String query = "INSERT INTO literary_source (`UID`, `title`, `author`, " +
                    "`description`, `timerange_start`, `timerange_end`, `author_location`, `author_latitude`, " +
                    "`author_longitude`) VALUES ('" + UID + "', " +
                    "\"Saint Herbert's Isle, A Legendary Poem, in Five Cantos, with Some Smaller Pieces\", 'John Bree', " +
                    "\"Saint Herbert's Isle, A Legendary Poem, in Five Cantos, with Some Smaller Pieces by John Bree. This book is a reproduction of the original book published in 1832 and may have some imperfections such as marks or hand-written notes.\"," +
                    "'1832', '1832', '', '', '');";
            DBConnection.getInstance().insertDB(query);

            for(Paragraph para: source.getText().getP()){
                if(null != para) {
                    for (Sentence sent : para.getS()) {
                        if(null != sent) {
                            for (Object object : sent.getContent()) {
                                if(null != object) {
                                    if (object instanceof Enamex) {
                                        Enamex enamex = (Enamex) object;
                                        query = "INSERT INTO `deepmap`.`literary_locations` (`linkUID`, `UID`, `enamex`, " +
                                                "`location_name`, `latitude`, `longitude`, `type`, `gazref`, `sw`, `confidence`, " +
                                                "`text_location`) VALUES ('" + UID + "', '" + UIDCommons.getInstance().buildStrong20() + "'," +
                                                "'" + enamex.toString() + "', \"" + enamex.getName() + "\", '" + enamex.getLat() + "'," +
                                                "'" + enamex.getLong() + "', '" + enamex.getType() + "', '" + enamex.getGazref() + "', " +
                                                "'" + enamex.getSw() + "', '" + enamex.getConf() + "', '" + sent.getId() + "');";
                                        DBConnection.getInstance().insertDB(query);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (Exception e) {
            System.out.println("Literary Loader" + e.getMessage());
        }
    }
}
