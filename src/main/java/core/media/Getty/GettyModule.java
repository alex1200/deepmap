package core.media.Getty;

import com.google.gson.Gson;
import core.media.Getty.cdo.GettyWrapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.eclipse.jetty.util.URIUtil;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Created by Alexander on 5/16/2017.
 */
public class GettyModule {
    private String test_apikey = "8p9pebpcp398drqhsnu4unym";
    private String test_secretKey = "DUrTFaWQxAd4q2QT6VSVwSCNe9Fxxr25pfJaaEZEWf9vd";

    private String apikey = "7jj6g5avr667tmkd9jhbc2y9";
    private String secretKey = "fMZSTH6MQXfspFgkzCDcXnjSgDVVvGeHcutpTy83nmGce";

    private String baseURI = "https://api.gettyimages.com/v3/search/images?phrase=";

    public static void main(String[] args) {
        GettyModule module = new GettyModule();
        module.searchLocation("coniston");
    }
    public GettyModule(){

    }

    public GettyWrapper searchLocation(String locationName){
//        String url = "http://api.harvardartmuseums.org/place?apikey="+apikey+"&q="+ StringEscapeUtils.escapeHtml4(locationName);
//        String url = "http://api.harvardartmuseums.org/object?apikey="+apikey+"&title="+ URIUtil.encodePath("red pike");
        String url = baseURI + locationName + "%20UK";
        url+= "&number_of_people=none";
        try {
            HttpClient client = new DefaultHttpClient();
            HttpGet request = new HttpGet(url);
            request.setHeader("Api-Key",apikey);
            HttpResponse response = client.execute(request);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder sb = new StringBuilder();
            String line = "";
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            GettyWrapper wrapper = new Gson().fromJson(sb.toString(), GettyWrapper.class);
            return wrapper;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return null;
    }
}
