package core.literary;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import org.apache.http.client.utils.URIUtils;
import org.restlet.data.Status;
import org.restlet.engine.util.StringUtils;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class LiterarySourceResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`literary_source`");
        getResponse().setStatus(Status.SUCCESS_OK);

        return buildRepresentation(table);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}