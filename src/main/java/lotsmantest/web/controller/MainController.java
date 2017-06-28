package lotsmantest.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lotsmantest.web.data.TestData;
import lotsmantest.web.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by gri on 13.06.17.
 */
@RestController
//@RequestMapping(value = "/lostmantest")
public class MainController {
    @Autowired
    TestData testData;

    @RequestMapping(value = "/empls")
    public @ResponseBody
    List<Employee> getListAllEmployee() {
        List<Employee> arr = testData.getArr();
        return arr;
    }

    //
// delete?id=2
    @RequestMapping(value = "/delete")
    public String deleteEmployee(@RequestParam("id") String id) {
        testData.delete(id);
        return id+" deleted ";
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String updateEmployee(@RequestBody String jsonData) {
        try {
            Employee emp = new ObjectMapper().readValue(jsonData, Employee.class);
            testData.update(emp);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "update";
    }

    // delete?id=2
   // @RequestMapping(value = "/add", consumes = "application/json", method = RequestMethod.POST)
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addEmployee(@RequestBody  String jsonData) {
        try {
            String ss = URLDecoder.decode(jsonData,"UTF-8");

            Employee emp = new ObjectMapper().readValue(ss, Employee.class);
            testData.add(emp);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "add";
    }

    @RequestMapping(value = "/")
    public String h() {
        return "index";
    }
}
