package core.crosthwaite;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import org.restlet.data.Status;
import org.restlet.representation.Representation;

import java.util.List;

public class TextMetaResource  extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`crosthwaithe_text_meta`");
        getResponse().setStatus(Status.SUCCESS_OK);

        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}