package core.explorer.text;

import Commons.DB.DBRow;

/**
 * Created by reinhola on 12/05/2017.
 */
public class TextMetaObject {
    public String Seq; 
    public String ID; 
    public String Decade; 
    public String Period; 
    public String Author; 
    public String Title_short; 
    public String Title_full; 
    public String Year_Pub; 
    public String Year_Comp; 
    public String Year_id; 
    public String Decade_comp; 
    public String Genre;
    public String Type_1; 
    public String Type_2; 
    public String Type_3; 
    public String Place_of_Publication_Primary; 
    public String Place_of_Publication_Secondary; 
    public String Place_of_Publication_Tertiary; 
    public String Publisher_Primary; 
    public String Publisher_Secondary; 
    public String Publisher_Tertiary; 
    public String Publisher_Quaternary; 
    public String Size_1st_edn; 
    public String Price_1st_edn; 
    public String British_Editions; 
    public String Other_Editions; 
    public String Gender; 
    public String Nationality; 
    public String Place_of_Birth; 
    public String Resident_in_LD; 
    public String Place_of_Residence_in_LD; 
    public String Ref_Number_in_Bicknell; 
    public String Notes_Additional_Information; 
    public String Filename1; 
    public String Filename; 
    public String Word_count; 
    public String Sentence_count; 
    public String WordsPerSentence;
    public String UID;
    
    public TextMetaObject(DBRow row){
        this.Seq = row.row.get(0).getKey().toString();
        this.ID = row.row.get(1).getKey().toString();
        this.Decade = row.row.get(2).getKey().toString();
        this.Period = row.row.get(3).getKey().toString();
        this.Author = row.row.get(4).getKey().toString();
        this.Title_short = row.row.get(5).getKey().toString();
        this.Title_full = row.row.get(6).getKey().toString();
        this.Year_Pub = row.row.get(7).getKey().toString();
        this.Year_Comp = row.row.get(8).getKey().toString();
        this.Year_id = row.row.get(9).getKey().toString();
        this.Decade_comp = row.row.get(10).getKey().toString();
        this.Genre = row.row.get(11).getKey().toString();
        this.Type_1 = row.row.get(12).getKey().toString();
        this.Type_2 = row.row.get(13).getKey().toString();
        this.Type_3 = row.row.get(14).getKey().toString();
        this.Place_of_Publication_Primary = row.row.get(15).getKey().toString();
        this.Place_of_Publication_Secondary = row.row.get(16).getKey().toString();
        this.Place_of_Publication_Tertiary = row.row.get(17).getKey().toString();
        this.Publisher_Primary = row.row.get(18).getKey().toString();
        this.Publisher_Secondary = row.row.get(19).getKey().toString();
        this.Publisher_Tertiary = row.row.get(20).getKey().toString();
        this.Publisher_Quaternary = row.row.get(21).getKey().toString();
        this.Size_1st_edn = row.row.get(22).getKey().toString();
        this.Price_1st_edn = row.row.get(23).getKey().toString();
        this.British_Editions = row.row.get(24).getKey().toString();
        this.Other_Editions = row.row.get(25).getKey().toString();
        this.Gender = row.row.get(26).getKey().toString();
        this.Nationality = row.row.get(27).getKey().toString();
        this.Place_of_Birth = row.row.get(28).getKey().toString();
        this.Resident_in_LD = row.row.get(29).getKey().toString();
        this.Place_of_Residence_in_LD = row.row.get(30).getKey().toString();
        this.Ref_Number_in_Bicknell = row.row.get(31).getKey().toString();
        this.Notes_Additional_Information = row.row.get(32).getKey().toString();
        this.Filename1 = row.row.get(33).getKey().toString();
        this.Filename = row.row.get(34).getKey().toString();
        this.Word_count = row.row.get(35).getKey().toString();
        this.Sentence_count = row.row.get(36).getKey().toString();
        this.WordsPerSentence = row.row.get(37).getKey().toString();
    }

    public String getSeq() {
        return Seq;
    }

    public String getID() {
        return ID;
    }

    public String getDecade() {
        return Decade;
    }

    public String getPeriod() {
        return Period;
    }

    public String getAuthor() {
        return Author;
    }

    public String getTitle_short() {
        return Title_short;
    }

    public String getTitle_full() {
        return Title_full;
    }

    public String getYear_Pub() {
        return Year_Pub;
    }

    public String getYear_Comp() {
        return Year_Comp;
    }

    public String getYear_id() {
        return Year_id;
    }

    public String getDecade_comp() {
        return Decade_comp;
    }

    public String getGenre() {
        return Genre;
    }

    public String getType_1() {
        return Type_1;
    }

    public String getType_2() {
        return Type_2;
    }

    public String getType_3() {
        return Type_3;
    }

    public String getPlace_of_Publication_Primary() {
        return Place_of_Publication_Primary;
    }

    public String getPlace_of_Publication_Secondary() {
        return Place_of_Publication_Secondary;
    }

    public String getPlace_of_Publication_Tertiary() {
        return Place_of_Publication_Tertiary;
    }

    public String getPublisher_Primary() {
        return Publisher_Primary;
    }

    public String getPublisher_Secondary() {
        return Publisher_Secondary;
    }

    public String getPublisher_Tertiary() {
        return Publisher_Tertiary;
    }

    public String getPublisher_Quaternary() {
        return Publisher_Quaternary;
    }

    public String getSize_1st_edn() {
        return Size_1st_edn;
    }

    public String getPrice_1st_edn() {
        return Price_1st_edn;
    }

    public String getBritish_Editions() {
        return British_Editions;
    }

    public String getOther_Editions() {
        return Other_Editions;
    }

    public String getGender() {
        return Gender;
    }

    public String getNationality() {
        return Nationality;
    }

    public String getPlace_of_Birth() {
        return Place_of_Birth;
    }

    public String getResident_in_LD() {
        return Resident_in_LD;
    }

    public String getPlace_of_Residence_in_LD() {
        return Place_of_Residence_in_LD;
    }

    public String getRef_Number_in_Bicknell() {
        return Ref_Number_in_Bicknell;
    }

    public String getNotes_Additional_Information() {
        return Notes_Additional_Information;
    }

    public String getFilename1() {
        return Filename1;
    }

    public String getFilename() {
        return Filename;
    }

    public String getWord_count() {
        return Word_count;
    }

    public String getSentence_count() {
        return Sentence_count;
    }

    public String getWordsPerSentence() {
        return WordsPerSentence;
    }


    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }
}
