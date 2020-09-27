package core;

import Commons.DB.DBConnection;
import core.crosthwaite.*;
import core.explorer.Engine;
import core.explorer.ExplorerMediaIconResource;
import core.explorer.concordance.ExplorerSearchEnamexResource;
import core.explorer.concordance.ExplorerSearchResource;
import core.explorer.feature.FeatureResource;
import core.explorer.feature.FeatureSearchResource;
import core.explorer.location.ExplorerSearchLocationResource;
import core.explorer.text.ExplorerTextMetaResource;
import core.explorer.text.ExplorerTextResource;
import core.geoparse.GeoparsePlaceResource;
import core.geoparse.GeoparseResource;
import core.holocaust.HolocaustEngine;
import core.holocaust.HolocaustMediaIconResource;
import core.holocaust.concordance.HolocaustSearchEnamexResource;
import core.holocaust.concordance.HolocaustSearchResource;
import core.holocaust.location.HolocaustSearchLocationResource;
import core.holocaust.text.HolocaustTextMetaResource;
import core.holocaust.text.HolocaustTextResource;
import core.literary.LiteraryLocationsResource;
import core.literary.LiterarySourceResource;
import core.media.Flickr.FlickrResource;
import core.media.MediaGettyResource;
import core.nlp.NLPGazetteersResource;
import core.nlp.NLPTextResource;
import core.survey.SurveyAnswerResource;
import core.survey.SurveyQuestionResource;
import core.survey.SurveyUserResource;
import org.restlet.Component;
import org.restlet.data.Protocol;
import org.restlet.resource.Directory;
import org.restlet.routing.Router;

public class ServerManager{
    public static Engine engine;
    public static HolocaustEngine holoengine;

    public static Engine getEngine(){
        if(null == engine){
            engine = new Engine();
        }
        return engine;
    }
    public static HolocaustEngine getHoloEngine(){
        if(null == holoengine){
//            holoengine = new HolocaustEngine();
        }
        return holoengine;
    }
    public ServerManager() {
        DBConnection.getInstance().createConnection("root","","127.0.0.1",3306,"deepmap");
        DBConnection.getInstance().openConnection();

        engine = new Engine();
//        holoengine = new HolocaustEngine();
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
            Directory dir4 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/ww3");
            dir4.setListingAllowed(true);
            dir4.setDeeplyAccessible(true);
            Directory dir5 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/muse");
            dir5.setListingAllowed(true);
            dir5.setDeeplyAccessible(true);
            Directory dir6 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/ww4");
            dir6.setListingAllowed(true);
            dir6.setDeeplyAccessible(true);

            Directory dir7 = new Directory(component.getContext().createChildContext(), this.getClass().getProtectionDomain().getCodeSource().getLocation().toString()+ "/Derwent Water Map");
            dir7.setListingAllowed(true);
            dir7.setDeeplyAccessible(true);

            router.attach("/web", dir);
            router.attach("/www", dir2);
            router.attach("/ww2", dir3);
            router.attach("/ww3", dir4);
            router.attach("/ww4", dir6);
            router.attach("/muse", dir5);

            router.attach("/DWM", dir7);
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
            router.attach("/explorer/search/enamex.{format}", ExplorerSearchEnamexResource.class);
            router.attach("/explorer/search/location.{format}", ExplorerSearchLocationResource.class);
            router.attach("/explorer/media/icon/{source}.{format}", ExplorerMediaIconResource.class);

            router.attach("/media/getty/{location}.{format}", MediaGettyResource.class);


            router.attach("/explorer/textmeta.{format}", ExplorerTextMetaResource.class);
            router.attach("/explorer/{textUID}/text.{format}", ExplorerTextResource.class);

            router.attach("/feature/feature.{format}", FeatureResource.class);
            router.attach("/feature/search.{format}", FeatureSearchResource.class);

            router.attach("/holocaust/textmeta.{format}", HolocaustTextMetaResource.class);
            router.attach("/holocaust/{textUID}/text.{format}", HolocaustTextResource.class);
            router.attach("/holocaust/search.{format}", HolocaustSearchResource.class);
            router.attach("/holocaust/search/enamex.{format}", HolocaustSearchEnamexResource.class);
            router.attach("/holocaust/search/location.{format}", HolocaustSearchLocationResource.class);
            router.attach("/holocaust/media/icon/{source}.{format}", HolocaustMediaIconResource.class);

            router.attach("/survey/questions/{page}.{format}", SurveyQuestionResource.class);
            router.attach("/survey/answer.{format}", SurveyAnswerResource.class);
            router.attach("/survey/user.{format}", SurveyUserResource.class);

            component.getDefaultHost().attach("", router);

            component.start();


        }
        catch (Exception e)
        {
            System.out.println(e);
        }

    }
}
