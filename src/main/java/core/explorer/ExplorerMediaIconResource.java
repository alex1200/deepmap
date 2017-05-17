package core.explorer;

import Commons.Server.AbstractServerResource;
import org.restlet.data.MediaType;
import org.restlet.representation.FileRepresentation;
import org.restlet.representation.Representation;

import java.io.File;

/**
 * Created by Alexander on 5/16/2017.
 */
public class ExplorerMediaIconResource extends AbstractServerResource {
    @Override
    protected Representation processGet(Representation representation) {
        String source = getAttribute("source");
        String format = getAttribute("format");
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(source+"."+format).getFile());
        FileRepresentation rep = new FileRepresentation(file, MediaType.ALL);
        return rep;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}