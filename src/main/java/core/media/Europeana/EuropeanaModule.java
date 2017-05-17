package core.media.Europeana;

import Commons.Geo.GeoCommon;
import Commons.Geo.GeoLocation;
import com.google.gson.Gson;
import core.media.Europeana.cdo.EuropeanaWrapper;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.eclipse.jetty.util.URIUtil;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.RoundingMode;
import java.text.DecimalFormat;

/**
 * Created by Alexander on 5/16/2017.
 */
public class EuropeanaModule {
    private String apikey = "jN2oNz4rZ";
    private String privateKey = "spAi4kNdR";

    private String baseURI = "https://www.europeana.eu/api/v2/";

    public static void main(String[] args) {
        EuropeanaModule module = new EuropeanaModule();
        module.searchLocation(54.367808527316996,-3.0723094940185547,1);
    }

    public EuropeanaModule(){

    }

    public EuropeanaWrapper searchLocation(double lat, double lng, double radius){
        String url = baseURI + "search.json?wskey=" + apikey;
        GeoLocation[] geo = GeoCommon.getInstance().boundingCoordinates(lat,lng,radius);

        DecimalFormat df = new DecimalFormat("#.####");
        df.setRoundingMode(RoundingMode.CEILING);

        url +="&query=pl_wgs84_pos_lat:[";
                url +=df.format(geo[0].getLat())+"+TO+";
                url +=df.format(geo[1].getLat())+"]+AND+pl_wgs84_pos_long:[";
        df.setRoundingMode(RoundingMode.FLOOR);

                url +=df.format(geo[0].getLng())+"+TO+";
                url +=df.format(geo[1].getLng())+"]&profile=minimal";
//        System.out.println(url);
//        url +="&title="+ URIUtil.encodePath("red pike");

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
            EuropeanaWrapper europeanaWrapper = new Gson().fromJson(sb.toString(), EuropeanaWrapper.class);
            return europeanaWrapper;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return null;
    }
}
