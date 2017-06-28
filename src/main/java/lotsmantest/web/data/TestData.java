package lotsmantest.web.data;

import lotsmantest.web.model.Employee;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by gri on 13.06.17.
 */

@Component
public class TestData {

    private Map<String, Employee> map = new HashMap<String, Employee>();

    public TestData() {
        init();
    }


    void init() {
        add(new Employee("1", "Alex", "01"));
        add(new Employee("2", "Max", "01"));
        add(new Employee("3", "Mery", "02"));
        add(new Employee("4", "Lion", "02"));
        writeToFile();
    }

    //for Controller

    public List<Employee> getArr() {
        writeToFile();
        return  new ArrayList<Employee>(map.values());
    }

    public void add(Employee emp) {
        map.put(emp.getId(), emp);
        writeToFile();
    }

    public void update(Employee emp) {
        add(emp);
        writeToFile();
    }

    public void delete(String id) {
        map.remove(id);
        writeToFile();
    }

    public void writeToFile(){
        File file = new File("src/main/webapp/tbl.csv");
        try {
            FileWriter fw = new FileWriter(file);
            fw.write("id,name, department\n");
            List<Employee> li = new ArrayList<Employee>(map.values());
            for(Employee emp : li){
                String s = emp.getId()+","+emp.getName()+"," + emp.getDepartment() + "\n";
                fw.write(s);
            }
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
