package core.crosthwaite;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import org.restlet.data.Status;
import org.restlet.representation.Representation;

import java.util.List;


public class StationTextResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        String stationUID = getAttribute("stationUID");
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`crosthwaithe_station_text` WHERE station_id='"+stationUID+"'");
        getResponse().setStatus(Status.SUCCESS_OK);

        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
