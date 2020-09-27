package core.explorer.feature;

import Commons.DB.DBRow;
import Commons.Geo.GeoLocation;
//import uk.me.jstott.jcoord.LatLng;
//import uk.me.jstott.jcoord.OSRef;

import static jdk.nashorn.internal.objects.Global.undefined;

/**
 * Created by Alexander Reinhold on 04/07/2017.
 */
public class FeatureObject {

    private String UID;
    private String altName;
    private String heritageCategory;
    private String riskMethod;
    private String URI;
    private String loaction;
    private String grade;
    private String listDate;
    private String NGR;
    private String easting;
    private String northing;

    private double latitude;
    private double longitude;

    public FeatureObject(){

    }

    public FeatureObject(DBRow row) {
        this.altName = row.row.get(0).getKey().toString();
        this.heritageCategory = row.row.get(1).getKey().toString();
        this.riskMethod = row.row.get(2).getKey().toString();
        this.URI = row.row.get(4).getKey().toString();
        this.loaction = row.row.get(9).getKey().toString();
        this.grade = row.row.get(10).getKey().toString();
        this.listDate = row.row.get(12).getKey().toString();
        this.NGR = row.row.get(14).getKey().toString();
        this.easting = row.row.get(16).getKey().toString();
        this.northing = row.row.get(17).getKey().toString();

//        LatLng latLng = new OSRef(Double.parseDouble(easting),Double.parseDouble(northing)).toLatLng();
//        latLng.toWGS84();
//
//        latitude = latLng.getLat();
//        longitude = latLng.getLng();
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public String getAltName() {
        return altName;
    }

    public void setAltName(String altName) {
        this.altName = altName;
    }

    public String getHeritageCategory() {
        return heritageCategory;
    }

    public void setHeritageCategory(String heritageCategory) {
        this.heritageCategory = heritageCategory;
    }

    public String getRiskMethod() {
        return riskMethod;
    }

    public void setRiskMethod(String riskMethod) {
        this.riskMethod = riskMethod;
    }

    public String getLoaction() {
        return loaction;
    }

    public void setLoaction(String loaction) {
        this.loaction = loaction;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getListDate() {
        return listDate;
    }

    public void setListDate(String listDate) {
        this.listDate = listDate;
    }

    public String getNGR() {
        return NGR;
    }

    public void setNGR(String NGR) {
        this.NGR = NGR;
    }

    public String getEasting() {
        return easting;
    }

    public void setEasting(String easting) {
        this.easting = easting;
    }

    public String getNorthing() {
        return northing;
    }

    public void setNorthing(String northing) {
        this.northing = northing;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getURI() {
        return URI;
    }

    public void setURI(String URI) {
        this.URI = URI;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
//
//    private void osGridToLatLon (double inEasting, double inNorthing) {
////        if (!(gridref instanceof OsGridRef)) throw new TypeError('gridref is not OsGridRef object');
////        if (datum === undefined) datum = LatLon.datum.WGS84;
//
//        double E = inEasting;
//        double N = inNorthing;
//
//        double a = 6377563.396, b = 6356256.909;              // Airy 1830 major & minor semi-axes
//        double F0 = 0.9996012717;                             // NatGrid scale factor on central meridian
//        double φ0 = Math.toRadians(49), λ0 = Math.toRadians(-2);  // NatGrid true origin is 49°N,2°W
//        double N0 = -100000, E0 = 400000;                     // northing & easting of true origin, metres
//        double e2 = 1 - (b*b)/(a*a);                          // eccentricity squared
//        double n = (a-b)/(a+b), n2 = n*n, n3 = n*n*n;         // n, n², n³
//
//        double φ=φ0, M=0;
//        do {
//            φ = (N-N0-M)/(a*F0) + φ;
//
//            double Ma = (1 + n + (5/4)*n2 + (5/4)*n3) * (φ-φ0);
//            double Mb = (3*n + 3*n*n + (21/8)*n3) * Math.sin(φ-φ0) * Math.cos(φ+φ0);
//            double Mc = ((15/8)*n2 + (15/8)*n3) * Math.sin(2*(φ-φ0)) * Math.cos(2*(φ+φ0));
//            double Md = (35/24)*n3 * Math.sin(3*(φ-φ0)) * Math.cos(3*(φ+φ0));
//            M = b * F0 * (Ma - Mb + Mc - Md);              // meridional arc
//
//        } while (N-N0-M >= 0.00001);  // ie until < 0.01mm
//
//        double cosφ = Math.cos(φ), sinφ = Math.sin(φ);
//        double ν = a*F0/Math.sqrt(1-e2*sinφ*sinφ);            // nu = transverse radius of curvature
//        double ρ = a*F0*(1-e2)/Math.pow(1-e2*sinφ*sinφ, 1.5); // rho = meridional radius of curvature
//        double η2 = ν/ρ-1;                                    // eta = ?
//
//        double tanφ = Math.tan(φ);
//        double tan2φ = tanφ*tanφ, tan4φ = tan2φ*tan2φ, tan6φ = tan4φ*tan2φ;
//        double secφ = 1/cosφ;
//        double ν3 = ν*ν*ν, ν5 = ν3*ν*ν, ν7 = ν5*ν*ν;
//        double VII = tanφ/(2*ρ*ν);
//        double VIII = tanφ/(24*ρ*ν3)*(5+3*tan2φ+η2-9*tan2φ*η2);
//        double IX = tanφ/(720*ρ*ν5)*(61+90*tan2φ+45*tan4φ);
//        double X = secφ/ν;
//        double XI = secφ/(6*ν3)*(ν/ρ+2*tan2φ);
//        double XII = secφ/(120*ν5)*(5+28*tan2φ+24*tan4φ);
//        double XIIA = secφ/(5040*ν7)*(61+662*tan2φ+1320*tan4φ+720*tan6φ);
//
//        double dE = (E-E0), dE2 = dE*dE, dE3 = dE2*dE, dE4 = dE2*dE2, dE5 = dE3*dE2, dE6 = dE4*dE2, dE7 = dE5*dE2;
//        φ = φ - VII*dE2 + VIII*dE4 - IX*dE6;
//        double λ = λ0 + X*dE - XI*dE3 + XII*dE5 - XIIA*dE7;
//
//        double point =  new GeoLocation(Math.toDegrees(φ), Math.toDegrees(λ));//, LatLon.datum.OSGB36
//        if (datum != LatLon.datum.OSGB36) point = point.convertDatum(datum);
//
//        return point;
//    }
}
