package core.geoparse;

import Commons.DB.DBConnection;
import Commons.uid.UIDCommons;
import core.geoparse.cdo.PlaceType;
import core.geoparse.cdo.PlacenameType;
import core.geoparse.cdo.PlacenamesType;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import java.io.File;

public class GeoparseLoader {

    public GeoparseLoader() {
        try {
            File file = new File("C:\\Users\\reinhola\\Downloads\\JFCS_HollanderErnest\\JFCS_HollanderErnest_UTF8_QAformat.txt.gaz.xml");
            JAXBContext jaxbContext = JAXBContext.newInstance(PlacenamesType.class);

            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            PlacenamesType source = (PlacenamesType) jaxbUnmarshaller.unmarshal(file);

            for (PlacenameType placename : source.getPlacename()) {
                if (null != placename) {
                    String UID = UIDCommons.getInstance().build20StrongCat("PLN");
                    //INSERT INTO `deepmap`.`geo_placename` (`linkUID`, `UID`, `ID`, `name`, `contained_by`) VALUES (
                    String query = "INSERT INTO `deepmap`.`geo_placename` (`linkUID`, `UID`, `ID`, `name`, `contained_by`) " +
                            "VALUES ('LIT001','" + UID + "', " +
                            "'" + placename.getId() + "', '" + placename.getName() + "','" + placename.getContainedBy() + "');";
                    DBConnection.getInstance().insertDB(query);
                    for (PlaceType place : placename.getPlace()) {
                        if (null != place) {
                            String placeUID = UIDCommons.getInstance().build20StrongCat("PLC");
                            query = "INSERT INTO `deepmap`.`geo_place` (`linkUID`, `UID`, `place_name`, `scaled_known`, " +
                                    "`distance_to_known`, `locality`, `clusteriness_rank`, `scaled_clusteriness`, `pop`, " +
                                    "`gazref`, `type`, `lat`, `long`, `in_cc`, `scaled_near`, `scaled_contains`, " +
                                    "`scaled_contained_by`, `scaled_pop`, `scaled_type`, `score`, `rank`) VALUES " +
                                    "('" + UID + "', '" + placeUID + "'," +
                                    "'" + place.getName() + "', '" + place.getScaledKnown() + "', " +
                                    "'" + place.getDistanceToKnown() + "'," +
                                    "'" + place.getLocality() + "', '" + place.getClusterinessRank() + "', " +
                                    "'" + place.getScaledClusteriness() + "', " +
                                    "'" + place.getPop() + "', '" + place.getGazref() + "', '" + place.getType() + "', " +
                                    "'" + place.getLat() + "', '" + place.getLong() + "', '" + place.getInCc() + "', " +
                                    "'" + place.getScaledNear() + "', '" + place.getScaledContains() + "', " +
                                    "'" + place.getScaledContainedBy() + "', " +
                                    "'" + place.getScaledPop() + "', '" + place.getScaledType() + "', '" + place.getScore() + "', " +
                                    "'" + place.getRank() + "');";
                            DBConnection.getInstance().insertDB(query);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Geoparse Loader" + e.getMessage());
        }
    }
}
