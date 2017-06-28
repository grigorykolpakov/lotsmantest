package test.lotsman;

import lotsmantest.web.controller.MainController;
import lotsmantest.web.data.TestData;
import lotsmantest.web.model.Employee;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Created by gri on 14.06.17.
 */
public class MainTest {

    @InjectMocks
    MainController controller;

    @Mock
    TestData mockTestData;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testListEmpl() {
        ArrayList<Employee> employees = new ArrayList<>();
        employees.add(new Employee("11", "Max", "01"));
        List<Employee> expectedEmployees = employees;
        when(mockTestData.getArr()).thenReturn(expectedEmployees);
        List<Employee> li = controller.getListAllEmployee();
        System.out.println("li.size()=" + li.size());
        assertEquals(li.size(), expectedEmployees.size());
    }
}
