package core.media.Flickr;

import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.REST;
import com.flickr4java.flickr.photos.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.*;

public class FlickrModule {
    public static void main(String[] args) {
        FlickrModule flickrModule = new FlickrModule();
        flickrModule.searchLocation(54.594487,-3.138446, 0.5);
    }
    public FlickrModule(){

    }

    public List<Photo> searchLocation(double lat, double lon, double radius) {
        try {
            List<Photo> listPhotos = new ArrayList<>();
            String apiKey = "9e5e25a029699853d2d5e31c1b81638d";
            String sharedSecret = "26fe720af3fb93f7";
            Flickr flickr = new Flickr(apiKey, sharedSecret, new REST());
            SearchParameters searchParameters = new SearchParameters();
            searchParameters.setAccuracy(16);
            searchParameters.setHasGeo(true);
            searchParameters.setRadius((int) Math.ceil(radius));
            searchParameters.setExtras(Extras.ALL_EXTRAS);
//            String[] tags = new String[1];
//            tags[0] = "geoData";
//            searchParameters.setMachineTags(tags);
            searchParameters.setLatitude(String.valueOf(lat));
            searchParameters.setLongitude(String.valueOf(lon));

            for (int i = 0; i <2; i++) {
                System.out.println("\tcurrent page: " + i);
                try {
                    PhotoList<Photo> list = flickr.getPhotosInterface().search(searchParameters, 500, i);
                    if (list.isEmpty())
                        break;

                    Iterator itr = list.iterator();
                    while (itr.hasNext()) {
                        listPhotos.add((Photo) itr.next());
                    }
                } catch (FlickrException e) {
                    e.printStackTrace();
                }
            }
            File file = new File("flickerTest.txt");
            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
            String l;
            for(Photo photo: listPhotos) {
                if (null != photo.getGeoData()) {
                    if(checkGeoData(photo.getGeoData(), lat ,lon, radius) == true) {
                        StringBuilder sb = new StringBuilder("var marker = new google.maps.Marker({\n");
                        sb.append("position: {lat: " + photo.getGeoData().getLatitude());
                        sb.append(", lng: " + photo.getGeoData().getLongitude());
                        sb.append("},\n" +
                                "        map: this.map,\n" +
                                "        title: \"" + photo.getTitle().replaceAll("\"", "'") +
                                "\"    });");
                        bw.write(sb.toString());
                    }
                }
            }
            bw.close();
//            System.out.println(listPhotos);
            return listPhotos;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean checkGeoData(GeoData geoData, double lat1, double lon1, double radius) {

        double lat2 = geoData.getLatitude();
        double lon2 = geoData.getLongitude();

        final int R = 6371; // Radius of the earth

        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lonDistance = Math.toRadians(lon2 - lon1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        if(distance <= radius*1000){
            return true;
        }
        return false;
    }
}
