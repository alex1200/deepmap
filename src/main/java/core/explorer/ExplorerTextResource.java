package core.explorer;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.List;

/**
 * Created by reinhola on 12/05/2017.
 */
public class ExplorerTextResource extends AbstractServerResource {
    @Override
    protected Representation processGet(Representation representation) {
        String textUID = getAttribute("textUID");
        List<TextObject> textList = ServerManager.getEngine().getTextlist();
        TextObject textObject = null;
        for(TextObject text : textList){
            if(text.getUID().equalsIgnoreCase(textUID)){
                textObject = text;
                break;
            }
        }
        String json = new Gson().toJson(textObject);
        return new StringRepresentation(json);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
