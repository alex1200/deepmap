
package core.geoparse.cdo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;


/**
 * <p>Java class for placeType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="placeType">
 *   &lt;simpleContent>
 *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *       &lt;attribute name="rank" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="score" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_pop" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_contained_by" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_contains" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_near" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="in-cc" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="long" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="lat" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="gazref" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="pop" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="clusteriness" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_clusteriness" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="clusteriness_rank" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="locality" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="distance-to-known" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="scaled_known" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="cc" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/extension>
 *   &lt;/simpleContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "placeType", propOrder = {
    "value"
})
public class PlaceType {

    @XmlValue
    protected String value;
    @XmlAttribute(name = "rank")
    protected String rank;
    @XmlAttribute(name = "score")
    protected String score;
    @XmlAttribute(name = "scaled_type")
    protected String scaledType;
    @XmlAttribute(name = "scaled_pop")
    protected String scaledPop;
    @XmlAttribute(name = "scaled_contained_by")
    protected String scaledContainedBy;
    @XmlAttribute(name = "scaled_contains")
    protected String scaledContains;
    @XmlAttribute(name = "scaled_near")
    protected String scaledNear;
    @XmlAttribute(name = "in-cc")
    protected String inCc;
    @XmlAttribute(name = "long")
    protected String _long;
    @XmlAttribute(name = "lat")
    protected String lat;
    @XmlAttribute(name = "type")
    protected String type;
    @XmlAttribute(name = "gazref")
    protected String gazref;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "pop")
    protected String pop;
    @XmlAttribute(name = "clusteriness")
    protected String clusteriness;
    @XmlAttribute(name = "scaled_clusteriness")
    protected String scaledClusteriness;
    @XmlAttribute(name = "clusteriness_rank")
    protected String clusterinessRank;
    @XmlAttribute(name = "locality")
    protected String locality;
    @XmlAttribute(name = "distance-to-known")
    protected String distanceToKnown;
    @XmlAttribute(name = "scaled_known")
    protected String scaledKnown;
    @XmlAttribute(name = "cc")
    protected String cc;

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the rank property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRank() {
        return rank;
    }

    /**
     * Sets the value of the rank property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRank(String value) {
        this.rank = value;
    }

    /**
     * Gets the value of the score property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScore() {
        return score;
    }

    /**
     * Sets the value of the score property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScore(String value) {
        this.score = value;
    }

    /**
     * Gets the value of the scaledType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledType() {
        return scaledType;
    }

    /**
     * Sets the value of the scaledType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledType(String value) {
        this.scaledType = value;
    }

    /**
     * Gets the value of the scaledPop property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledPop() {
        return scaledPop;
    }

    /**
     * Sets the value of the scaledPop property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledPop(String value) {
        this.scaledPop = value;
    }

    /**
     * Gets the value of the scaledContainedBy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledContainedBy() {
        return scaledContainedBy;
    }

    /**
     * Sets the value of the scaledContainedBy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledContainedBy(String value) {
        this.scaledContainedBy = value;
    }

    /**
     * Gets the value of the scaledContains property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledContains() {
        return scaledContains;
    }

    /**
     * Sets the value of the scaledContains property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledContains(String value) {
        this.scaledContains = value;
    }

    /**
     * Gets the value of the scaledNear property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledNear() {
        return scaledNear;
    }

    /**
     * Sets the value of the scaledNear property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledNear(String value) {
        this.scaledNear = value;
    }

    /**
     * Gets the value of the inCc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInCc() {
        return inCc;
    }

    /**
     * Sets the value of the inCc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInCc(String value) {
        this.inCc = value;
    }

    /**
     * Gets the value of the long property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLong() {
        return _long;
    }

    /**
     * Sets the value of the long property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLong(String value) {
        this._long = value;
    }

    /**
     * Gets the value of the lat property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLat() {
        return lat;
    }

    /**
     * Sets the value of the lat property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLat(String value) {
        this.lat = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Gets the value of the gazref property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGazref() {
        return gazref;
    }

    /**
     * Sets the value of the gazref property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGazref(String value) {
        this.gazref = value;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the pop property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPop() {
        return pop;
    }

    /**
     * Sets the value of the pop property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPop(String value) {
        this.pop = value;
    }

    /**
     * Gets the value of the clusteriness property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getClusteriness() {
        return clusteriness;
    }

    /**
     * Sets the value of the clusteriness property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setClusteriness(String value) {
        this.clusteriness = value;
    }

    /**
     * Gets the value of the scaledClusteriness property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledClusteriness() {
        return scaledClusteriness;
    }

    /**
     * Sets the value of the scaledClusteriness property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledClusteriness(String value) {
        this.scaledClusteriness = value;
    }

    /**
     * Gets the value of the clusterinessRank property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getClusterinessRank() {
        return clusterinessRank;
    }

    /**
     * Sets the value of the clusterinessRank property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setClusterinessRank(String value) {
        this.clusterinessRank = value;
    }

    /**
     * Gets the value of the locality property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLocality() {
        return locality;
    }

    /**
     * Sets the value of the locality property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLocality(String value) {
        this.locality = value;
    }

    /**
     * Gets the value of the distanceToKnown property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDistanceToKnown() {
        return distanceToKnown;
    }

    /**
     * Sets the value of the distanceToKnown property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDistanceToKnown(String value) {
        this.distanceToKnown = value;
    }

    /**
     * Gets the value of the scaledKnown property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScaledKnown() {
        return scaledKnown;
    }

    /**
     * Sets the value of the scaledKnown property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScaledKnown(String value) {
        this.scaledKnown = value;
    }

    /**
     * Gets the value of the cc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCc() {
        return cc;
    }

    /**
     * Sets the value of the cc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCc(String value) {
        this.cc = value;
    }

}
