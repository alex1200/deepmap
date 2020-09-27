package core.holocaust.text;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.Map;

/**
 * Created by reinhola on 12/05/2017.
 */
public class HolocaustTextMetaResource extends AbstractServerResource {
    @Override
    protected Representation processGet(Representation representation) {
        Map<String, TextMetaObject> metaList = ServerManager.getHoloEngine().getTextMetalist();
        String json = new Gson().toJson(metaList);
        return new StringRepresentation(json);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
