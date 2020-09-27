package core.explorer.feature;

import Commons.Server.AbstractServerResource;
import com.google.gson.Gson;
import core.ServerManager;
import core.explorer.text.TextMetaObject;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.List;
import java.util.Map;

/**
 * Created by Alexander Reinhold on 29/08/2017.
 */
public class FeatureResource extends AbstractServerResource {
    @Override
    protected Representation processGet(Representation representation) {
        List<FeatureObject> metaList = ServerManager.getEngine().getFeatureList();
        String json = new Gson().toJson(metaList);
        return new StringRepresentation(json);
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}

//SELECT * FROM deepmap.featuregroup_heritageatrisk_2016 INNER JOIN deepmap.featuregroup_listedbuilding_2017 ON deepmap.featuregroup_heritageatrisk_2016.ListEntry = deepmap.featuregroup_listedbuilding_2017.ListEntry;
