package core.explorer;

import Commons.DB.DBConnection;
import Commons.DB.DBRow;
import Commons.uid.UIDCommons;
import com.sun.javafx.fxml.expression.Expression;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Engine {
    public static void main(String[] args) {
        Engine engine = new Engine();

        List<ConcordanceObject> concordanceObjects = engine.search("waterfall",10,false);
        List<ConcordanceObject> concordanceObjects2 = engine.search("waterfall","tourist",10,false);
        //System.out.println(concordanceObjects);
        System.out.println(concordanceObjects2);
    }

    public List<TextObject> textlist;
    public Map<String,TextMetaObject> textMetalist;

    public Engine(){
        initialize();

        loadTexts();
    }

    private void initialize() {
        textlist = new ArrayList<>();
        textMetalist = new HashMap<>();
    }

    public List<TextObject> getTextlist() {
        return textlist;
    }

    public Map<String, TextMetaObject> getTextMetalist() {
        return textMetalist;
    }

    private void loadTexts() {
        DBConnection.getInstance().createConnection("root","root","127.0.0.1",3306,"deepmap");
        DBConnection.getInstance().openConnection();
        List<DBRow> table = DBConnection.getInstance().queryDB("SELECT * FROM `deepmap`.`full_metadata`");

        ClassLoader classLoader = getClass().getClassLoader();
        for(DBRow row : table){
            String uid = UIDCommons.getInstance().build20StrongCat("TEXT");
            TextObject textObject = new TextObject();
            textObject.setUID(uid);
            TextMetaObject textMetaObject = new TextMetaObject(row);
            textMetaObject.setUID(uid);
            textObject.setMeta(textMetaObject);
            String filename = textMetaObject.getFilename1() + ".xml";
            String text = "";
            BufferedReader br = null;
            try {
                br = new BufferedReader(new FileReader(new File(classLoader.getResource(filename).getFile())));
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                    sb.append(line);
                    sb.append(System.lineSeparator());
                    line = br.readLine();
                }
                text = sb.toString();

                br.close();
            }
            catch (Exception e)
            {
            }
            textObject.setText(text);
            textMetalist.put(uid, textMetaObject);
            textlist.add(textObject);
        }
    }

    public List<ConcordanceObject> search(String term, int concordanceLimit, boolean fuzzy){
        List<ConcordanceObject> concordanceList = new ArrayList<>();
        for(TextObject textObject: textlist){
//            String[] result = textObject.getText().split("\\s");

            for (TokenObject token: textObject.getTokenList()){
                if((term.equalsIgnoreCase(token.getWord()) == true && fuzzy == false) || (token.getWord().contains(term) == true && fuzzy == true)){
                    ConcordanceObject concordance = new ConcordanceObject();
                    concordance.setTerm(token.getWord());
                    concordance.setTermIndex(token.getIndex());
                    concordance.setParentUID(textObject.getUID());

                    String text = "";
                    String leading = "";
                    String trailing = "";
                    boolean firstCon = true;
                    for(int i = 0; i < (concordanceLimit * 2) + 1; i++){
                        int conIndex = token.getIndex() - (concordanceLimit - i);
                        if(conIndex < 0){
                            continue;
                        }
                        if(firstCon == true){
                            concordance.setStartIndex(conIndex);
                            firstCon = false;
                        }
                        concordance.addConcordance(textObject.getTokenList().get(conIndex));

                        concordance.setEndIndex(conIndex);

                        text += textObject.getTokenList().get(conIndex).getWord() + " ";
                        if(conIndex < token.getIndex()){
                            leading += textObject.getTokenList().get(conIndex).getWord() + " ";
                        }
                        else if(conIndex > token.getIndex()){
                            trailing += textObject.getTokenList().get(conIndex).getWord() + " ";
                        }
                    }
                    concordance.setConcordanceString(text);
                    concordance.setConcordanceStringLeading(leading);
                    concordance.setConcordanceStringTrailing(trailing);
                    concordanceList.add(concordance);
                }
            }
        }
        return concordanceList;
    }

    public List<ConcordanceObject> search(String term, String secondaryTerm, int concordanceLimit, boolean fuzzy){
        List<ConcordanceObject> resultList = new ArrayList<>();
        List<ConcordanceObject> firstTermList = search(term, concordanceLimit, fuzzy);
        for(ConcordanceObject concordanceObject: firstTermList){
            if(fuzzy == true) {
                if (concordanceObject.getConcordanceString().contains(secondaryTerm) == true) {
                    resultList.add(concordanceObject);
                }
            }
            else if(fuzzy == false){
                for(TokenObject token: concordanceObject.getConcordance()){
                    if(token.getWord().equalsIgnoreCase(secondaryTerm) == true){
                        resultList.add(concordanceObject);
                        break;
                    }
                }
            }
        }
        return resultList;
    }

}
