package core.media;

import Commons.Server.AbstractServerResource;
import com.flickr4java.flickr.photos.Photo;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;

import java.util.List;

public class FlickrResource extends AbstractServerResource{
    @Override
    protected Representation processGet(Representation representation) {
        String lat = getAttribute("lat");
        String lon = getAttribute("lon");
        String radius = getAttribute("radius");

        FlickrModule flickrModule = new FlickrModule();
        List<Photo> listPhotos = flickrModule.searchLocation(Double.valueOf(lat),Double.valueOf(lon), Double.valueOf(radius));

        StringBuilder htmlString = new StringBuilder();
        htmlString.append("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Title</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div id=\"map\" style=\"width:100vw;height:100vh\"></div>\n" +
                "</body>\n" +
                "<script>\n" +
                "    function initMap() {\n" +
                "        var myLatLng = {lat: "+Double.valueOf(lat)+", lng:"+Double.valueOf(lon)+"};\n" +
                "        //54.57417972892827,-3.1730026245116916\n" +
                "\n" +
                "        this.map = new google.maps.Map(document.getElementById('map'), {\n" +
                "            zoom: 13,\n" +
                "            center: myLatLng\n" +
                "        });\n" +
                "        var icon = 'media/sprites/sprite-hotspot-med.png';\n" +
                "        var marker = new google.maps.Marker({\n" +
                "            position: {lat:"+Double.valueOf(lat)+", lng:"+Double.valueOf(lon)+"},\n" +
                "            map: this.map,\n" +
                "                icon: icon\n" +
                "        });\n" +
                "        var cityCircle = new google.maps.Circle({\n" +
                "            strokeColor: '#FF0000',\n" +
                "            strokeOpacity: 0.8,\n" +
                "            strokeWeight: 2,\n" +
                "            fillColor: '#FF0000',\n" +
                "            fillOpacity: 0.35,\n" +
                "            map: this.map,\n" +
                "            center: {lat:"+Double.valueOf(lat)+", lng:"+Double.valueOf(lon)+"},\n" +
                "            radius: "+Double.valueOf(radius)*1000+"\n" +
                "        });\n" +
                "        var cityCircle = new google.maps.Circle({\n" +
                "            strokeColor: '#FF0000',\n" +
                "            strokeOpacity: 0.8,\n" +
                "            strokeWeight: 2,\n" +
                "            fillColor: '#FF0000',\n" +
                "            fillOpacity: 0.35,\n" +
                "            map: this.map,\n" +
                "            center: {lat:"+Double.valueOf(lat)+", lng:"+Double.valueOf(lon)+"},\n" +
                "            radius: 1000\n" +
                "        });");


        for(Photo photo: listPhotos) {
            if (null != photo.getGeoData()) {
                if(flickrModule.checkGeoData(photo.getGeoData(), Double.valueOf(lat),Double.valueOf(lon), Double.valueOf(radius)) == true) {
                    StringBuilder sb = new StringBuilder("var marker = new google.maps.Marker({\n");
                    sb.append("position: {lat: " + photo.getGeoData().getLatitude());
                    sb.append(", lng: " + photo.getGeoData().getLongitude());
                    sb.append("},\n" +
                            "        map: this.map,\n" +
                            "        title: \"" + photo.getTitle().replaceAll("\"", "'") +
                            "\"    });");
                    htmlString.append(sb.toString());
                }
            }
        }

        htmlString.append("    }\n" +
                "</script>\n" +
                "\n" +
                "<script async defer\n" +
                "        src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyDFFW6ftcenI5Zs6FxjmwSKwJe0cA852_g&callback=initMap\">\n" +
                "</script>\n" +
                "</html>");
        Representation rep = new StringRepresentation(htmlString.toString());
        rep.setMediaType(MediaType.TEXT_HTML);
        return rep;
    }

    @Override
    protected Representation processPost(Representation representation) {
        return null;
    }
}
