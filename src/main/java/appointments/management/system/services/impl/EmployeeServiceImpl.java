package appointments.management.system.services.impl;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Appointment;
import appointments.management.system.entities.Carrier;
import appointments.management.system.entities.Employee;
import appointments.management.system.repositories.CarrierRepository;
import appointments.management.system.repositories.EmployeeRepository;
import appointments.management.system.services.CarrierService;
import appointments.management.system.services.EmployeeService;
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private CarrierService carrierService;

	@Override
	public Employee save(Employee employee, int id) {
		Carrier carrier= carrierService.findById(id);
		employee.setRole("ROLE_EMPLOYEE");
		employee.setCarrier(carrier);
		return employeeRepository.save(employee);
	}

	@Override
	public Boolean delete(int id) {
		if (employeeRepository.existsById(id)) {
			employeeRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Employee update(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Employee findById(int id) {
		return employeeRepository.findById(id).get();
	}

	@Override
	public Collection<Employee> findByCarrierId(int id) {
		return employeeRepository.findByCarrierId(id);
	}
	@Override
	public Employee findByUserName(String Username) {
		return employeeRepository.findByUsername(Username);
	}

	@Override
	public Employee findByEmail(String email) {
		return employeeRepository.findByEmail(email);
	}

	@Override
	public Collection<Employee> findAll() {
		Iterable<Employee> itr = employeeRepository.findAll();
		return (Collection<Employee>) itr;
	}

}
