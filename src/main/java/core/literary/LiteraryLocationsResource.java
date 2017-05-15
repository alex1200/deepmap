package core.literary;

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

public class LiteraryLocationsResource extends AbstractServerResource{
    @Override
    protected  Representation processGet(Representation representation) {
        String litUID = getAttribute("litUID");
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`literary_locations` WHERE linkUID = '"+litUID+"'");
        getResponse().setStatus(Status.SUCCESS_OK);

        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
