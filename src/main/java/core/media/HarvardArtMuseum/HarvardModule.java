package core.media.HarvardArtMuseum;

import com.google.gson.Gson;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.eclipse.jetty.util.URIUtil;
import org.restlet.engine.util.StringUtils;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Created by Alexander on 5/16/2017.
 */
public class HarvardModule {
    private String apikey = "75a53db0-39ca-11e7-b2d0-4f0a51e36477";

    public static void main(String[] args) {
        HarvardModule harvardModule = new HarvardModule();
        harvardModule.searchLocation("red pike");
    }
    public HarvardModule(){

    }

    public HarvardArtWrapper searchLocation(String locationName){
//        String url = "http://api.harvardartmuseums.org/place?apikey="+apikey+"&q="+ StringEscapeUtils.escapeHtml4(locationName);
        String url = "http://api.harvardartmuseums.org/object?apikey="+apikey+"&title="+ URIUtil.encodePath("red pike");

        try {
            HttpClient client = new DefaultHttpClient();
            HttpGet request = new HttpGet(url);
            HttpResponse response = client.execute(request);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder sb = new StringBuilder();
            String line = "";
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            HarvardArtWrapper harvardArtWrapper = new Gson().fromJson(sb.toString(), HarvardArtWrapper.class);
            return harvardArtWrapper;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return null;
    }
}
