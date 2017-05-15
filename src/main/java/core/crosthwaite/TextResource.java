package core.crosthwaite;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import org.restlet.data.Status;
import org.restlet.representation.Representation;

import java.util.List;

public class TextResource  extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
//        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`crosthwaithe_stations`");
//        getResponse().setStatus(Status.SUCCESS_OK);
//
//        return buildRepresentation(table);
        return null;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
