
package core.geoparse.cdo;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for placenameType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="placenameType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="place" type="{}placeType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="contained-by" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="contains" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="abbrev-for" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "placenameType", propOrder = {
    "place"
})
public class PlacenameType {

    protected List<PlaceType> place;
    @XmlAttribute(name = "id")
    protected String id;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "contained-by")
    protected String containedBy;
    @XmlAttribute(name = "contains")
    protected String contains;
    @XmlAttribute(name = "abbrev-for")
    protected String abbrevFor;

    /**
     * Gets the value of the place property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the place property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPlace().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link PlaceType }
     * 
     * 
     */
    public List<PlaceType> getPlace() {
        if (place == null) {
            place = new ArrayList<PlaceType>();
        }
        return this.place;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
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
     * Gets the value of the containedBy property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContainedBy() {
        return containedBy;
    }

    /**
     * Sets the value of the containedBy property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContainedBy(String value) {
        this.containedBy = value;
    }

    /**
     * Gets the value of the contains property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContains() {
        return contains;
    }

    /**
     * Sets the value of the contains property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContains(String value) {
        this.contains = value;
    }

    /**
     * Gets the value of the abbrevFor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAbbrevFor() {
        return abbrevFor;
    }

    /**
     * Sets the value of the abbrevFor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAbbrevFor(String value) {
        this.abbrevFor = value;
    }

}
