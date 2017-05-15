
package core.geoparse.cdo;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for placenamesType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="placenamesType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="placename" type="{}placenameType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="placenames")
@XmlType(name = "placenamesType", propOrder = {
    "placename"
})
public class PlacenamesType {

    protected List<PlacenameType> placename;

    /**
     * Gets the value of the placename property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the placename property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPlacename().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link PlacenameType }
     * 
     * 
     */
    public List<PlacenameType> getPlacename() {
        if (placename == null) {
            placename = new ArrayList<PlacenameType>();
        }
        return this.placename;
    }

}
