package core.nlp;

import Commons.Server.AbstractServerResource;
import NLPCommons.GeoParse.GeoParseCommon;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

public class NLPGazetteerResource extends AbstractServerResource {

    @Override
    protected Representation processGet(Representation representation) {

        Representation rep = new StringRepresentation("");
        return rep;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }

}
