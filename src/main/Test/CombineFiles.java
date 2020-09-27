import Commons.File.FileCommons;
import Commons.uid.UIDCommons;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class CombineFiles {
    public static void main(String[] args) {
        CombineFiles combineFiles = new CombineFiles();
    }
    public  CombineFiles(){
        File dir = new File("Resources/Holocaust");

        String maintext = "";
        String lastFile = "";
        for(File file: dir.listFiles()){
            String text = FileCommons.getInstance().readFile(file.getPath());
            String[] filename = file.getName().split("\\.");
            if(filename[0].equalsIgnoreCase(lastFile)){
                maintext += text;
            }
            else{
                String interviewee = "";
                Document doc = Jsoup.parse(maintext);
                Elements e = doc.select("interviewee");
                if (e.size() > 0 && null != e.get(0)) {
                    try {
                        interviewee = e.get(0).text();
                    } catch (Exception exc) {
                    }
                }
                String gender = "";
                e = doc.select("gender");
                if (e.size() > 0 && null != e.get(0)) {
                    try {
                        gender = e.get(0).text();
                    } catch (Exception exc) {
                    }
                }
                if(interviewee.equalsIgnoreCase("") == false){
                    saveFile(maintext, gender, dir.getPath()+"_Comb/", interviewee," (" + lastFile + ")");//catch the last file
                }
                else{
                    saveFile(maintext, gender, dir.getPath()+"_Comb/", lastFile,"");//catch the last file
                }
                lastFile = filename[0];
                maintext = text;
            }
        }
        String interviewee = "";
        Document doc = Jsoup.parse(maintext);
        Elements e = doc.select("interviewee");
        if (e.size() > 0 && null != e.get(0)) {
            try {
                interviewee = e.get(0).text();
            } catch (Exception exc) {
            }
        }
        String gender = "";
        e = doc.select("gender");
        if (e.size() > 0 && null != e.get(0)) {
            try {
                gender = e.get(0).text();
            } catch (Exception exc) {
            }
        }
        if(interviewee.equalsIgnoreCase("") == false){
            saveFile(maintext, gender, dir.getPath()+"_Comb/", interviewee," (" + lastFile + ")");//catch the last file
        }
        else{
            saveFile(maintext, gender, dir.getPath()+"_Comb/", lastFile,"");//catch the last file
        }

    }

    private void saveFile(String text, String gender, String dir, String index, String id){
        System.out.println(index);
//        if(new File(dir + "/" + index + ".xml").exists()){
            index = index + id;
//        }
        FileCommons.getInstance().write(new File(dir + "/gender/" + gender + "/" + index + ".xml"), text);
        FileCommons.getInstance().write(new File(dir + "/" + index + ".xml"), text);
        boolean specGhetto = false;
        if (text.toLowerCase().indexOf("ghetto") != -1) {
            FileCommons.getInstance().write(new File(dir + "/gender/" + gender + "/ghetto/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/ghetto/" + index + ".xml"), text);
        }
        if (text.toLowerCase().indexOf("budapest") != -1) {
            FileCommons.getInstance().write(new File(dir + "/budapest/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/budapest/gender/" + gender + "/" + index + ".xml"), text);
            specGhetto = true;
        }
        if (text.toLowerCase().indexOf("krakow") != -1) {
            FileCommons.getInstance().write(new File(dir + "/krakow/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/krakow/gender/" + gender + "/" + index + ".xml"), text);
            specGhetto = true;
        }
        if (text.toLowerCase().indexOf("cracow") != -1) {
            FileCommons.getInstance().write(new File(dir + "/cracow/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/cracow/gender/" + gender + "/" + index + ".xml"), text);
            specGhetto = true;
        }
        if (text.toLowerCase().indexOf("kaunas") != -1) {
            FileCommons.getInstance().write(new File(dir + "/kaunas/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/kaunas/gender/" + gender + "/" + index + ".xml"), text);
            specGhetto = true;
        }
        if (text.toLowerCase().indexOf("kovno") != -1) {
            FileCommons.getInstance().write(new File(dir + "/kovno/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/kovno/gender/" + gender + "/" + index + ".xml"), text);
            specGhetto = true;
        }

        if(specGhetto == false && text.toLowerCase().indexOf("ghetto") == -1){
            FileCommons.getInstance().write(new File(dir + "/No_Ghetto_Mention/" + index + ".xml"), text);
            FileCommons.getInstance().write(new File(dir + "/No_Ghetto_Mention/gender/" + gender + "/" + index + ".xml"), text);
        }
    }
}
