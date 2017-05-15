package core.geoparse;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import org.restlet.data.Status;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GeoparsePlaceResource  extends AbstractServerResource {
    @Override
    protected  Representation processGet(Representation representation) {
        String plnUID = getAttribute("plnUID");
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`geo_place` WHERE linkUID = '"+plnUID+"'");
        getResponse().setStatus(Status.SUCCESS_OK);

        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
