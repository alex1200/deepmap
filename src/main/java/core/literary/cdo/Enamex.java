
package core.literary.cdo;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;attribute name="conf" type="{http://www.w3.org/2001/XMLSchema}decimal" />
 *       &lt;attribute name="gazref" type="{http://www.w3.org/2001/XMLSchema}NMTOKEN" />
 *       &lt;attribute name="lat" type="{http://www.w3.org/2001/XMLSchema}decimal" />
 *       &lt;attribute name="long" type="{http://www.w3.org/2001/XMLSchema}decimal" />
 *       &lt;attribute name="name" use="required" type="{http://www.w3.org/2001/XMLSchema}anySimpleType" />
 *       &lt;attribute name="sw" use="required" type="{http://www.w3.org/2001/XMLSchema}NCName" />
 *       &lt;attribute name="type" type="{http://www.w3.org/2001/XMLSchema}anySimpleType" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "content"
})
@XmlRootElement(name = "enamex")
public class Enamex {

    @XmlValue
    protected String content;
    @XmlAttribute(name = "conf")
    protected BigDecimal conf;
    @XmlAttribute(name = "gazref")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "NMTOKEN")
    protected String gazref;
    @XmlAttribute(name = "lat")
    protected BigDecimal lat;
    @XmlAttribute(name = "long")
    protected BigDecimal _long;
    @XmlAttribute(name = "name", required = true)
    @XmlSchemaType(name = "anySimpleType")
    protected String name;
    @XmlAttribute(name = "sw", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "NCName")
    protected String sw;
    @XmlAttribute(name = "type")
    @XmlSchemaType(name = "anySimpleType")
    protected String type;

    /**
     * Gets the value of the content property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getContent() {
        return content;
    }

    /**
     * Sets the value of the content property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setContent(String value) {
        this.content = value;
    }

    /**
     * Gets the value of the conf property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getConf() {
        return conf;
    }

    /**
     * Sets the value of the conf property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setConf(BigDecimal value) {
        this.conf = value;
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
     * Gets the value of the lat property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getLat() {
        return lat;
    }

    /**
     * Sets the value of the lat property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setLat(BigDecimal value) {
        this.lat = value;
    }

    /**
     * Gets the value of the long property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getLong() {
        return _long;
    }

    /**
     * Sets the value of the long property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setLong(BigDecimal value) {
        this._long = value;
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
     * Gets the value of the sw property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSw() {
        return sw;
    }

    /**
     * Sets the value of the sw property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSw(String value) {
        this.sw = value;
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

}
