package core;

import Commons.DB.DBConnection;
import core.crosthwaite.*;
import core.explorer.Engine;
import core.explorer.ExplorerMediaIconResource;
import core.explorer.concordance.ExplorerSearchResource;
import core.explorer.location.ExplorerSearchLocationResource;
import core.explorer.text.ExplorerTextMetaResource;
import core.explorer.text.ExplorerTextResource;
import core.geoparse.GeoparsePlaceResource;
import core.geoparse.GeoparseResource;
import core.literary.LiteraryLocationsResource;
import core.literary.LiterarySourceResource;
import core.media.Flickr.FlickrResource;
import core.nlp.NLPGazetteersResource;
import core.nlp.NLPTextResource;
import org.restlet.Component;
import org.restlet.data.Protocol;
import org.restlet.resource.Directory;
import org.restlet.routing.Router;

public class ServerManager{
    public static Engine engine;

    public static Engine getEngine(){
        if(null == engine){
            engine = new Engine();
        }
        return engine;
    }
    public ServerManager() {
        DBConnection.getInstance().createConnection("root","root","127.0.0.1",3360,"deepmap");
        DBConnection.getInstance().openConnection();

        engine = new Engine();
//        LiteraryLoader literaryLoader = new LiteraryLoader();
//        DBConnection.getInstance().closeConnection();

//        GeoparseLoader geoparseLoader = new GeoparseLoader();
//        DBConnection.getInstance().closeConnection();

        try {
            final Component component = new Component();

            component.getServers().add(Protocol.HTTP, 8182);
            component.getClients().add(Protocol.FILE);
            final Router router = new Router(component.getContext().createChildContext());
            Directory dir = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/web");
            dir.setListingAllowed(true);
            dir.setDeeplyAccessible(true);
            Directory dir2 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/www");
            dir2.setListingAllowed(true);
            dir2.setDeeplyAccessible(true);
            Directory dir3 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/ww2");
            dir3.setListingAllowed(true);
            dir3.setDeeplyAccessible(true);

            router.attach("/web", dir);
            router.attach("/www", dir2);
            router.attach("/ww2", dir3);
//
            router.attach("/literary.{format}", LiterarySourceResource.class);
            router.attach("/literary/{litUID}/locations.{format}", LiteraryLocationsResource.class);

            router.attach("/literary/{litUID}/placename.{format}", GeoparseResource.class);
            router.attach("/literary/{litUID}/placename/{plnUID}/places.{format}", GeoparsePlaceResource.class);

            router.attach("/crosthwaite/stations.{format}", StationLocationsResource.class);
            router.attach("/crosthwaite/text.{format}", TextMetaResource.class);
            router.attach("/crosthwaite/text/{textUID}.{format}", TextResource.class);
            router.attach("/crosthwaite/text/{textUID}/{start}/{end}/text.{format}", TextDetailResource.class);
            router.attach("/crosthwaite/station/{stationUID}/text.{format}", StationTextResource.class);

//            router.attach("/nlp/parse.{format}", NLPResource.class);
            router.attach("/nlp/gazetteers.{format}", NLPGazetteersResource.class);
            router.attach("/nlp/{textUID}.{format}", NLPTextResource.class);
//            router.attach("/nlp/{textUID}/response.html", new WrapperRestlet());

            router.attach("/media/flickr/{lat}/{lon}/{radius}/search.{format}", FlickrResource.class);

            router.attach("/explorer/search.{format}", ExplorerSearchResource.class);
            router.attach("/explorer/search/location.{format}", ExplorerSearchLocationResource.class);
            router.attach("/explorer/media/icon/{source}.{format}", ExplorerMediaIconResource.class);


            router.attach("/explorer/textmeta.{format}", ExplorerTextMetaResource.class);
            router.attach("/explorer/{textUID}/text.{format}", ExplorerTextResource.class);

            component.getDefaultHost().attach("", router);

            component.start();


        }
        catch (Exception e)
        {
            System.out.println(e);
        }

    }
}
