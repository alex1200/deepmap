package core.holocaust.text;

import Commons.DB.DBRow;

/**
 * Created by reinhola on 12/05/2017.
 */
public class TextMetaObject {
    public String Name;
    public String UID;
    
    public TextMetaObject(){

    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }
}
