
package core.geoparse.cdo;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the xml package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Placenames_QNAME = new QName("", "placenames");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: xml
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link PlacenamesType }
     * 
     */
    public PlacenamesType createPlacenamesType() {
        return new PlacenamesType();
    }

    /**
     * Create an instance of {@link PlaceType }
     * 
     */
    public PlaceType createPlaceType() {
        return new PlaceType();
    }

    /**
     * Create an instance of {@link PlacenameType }
     * 
     */
    public PlacenameType createPlacenameType() {
        return new PlacenameType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link PlacenamesType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "placenames")
    public JAXBElement<PlacenamesType> createPlacenames(PlacenamesType value) {
        return new JAXBElement<PlacenamesType>(_Placenames_QNAME, PlacenamesType.class, null, value);
    }

}
