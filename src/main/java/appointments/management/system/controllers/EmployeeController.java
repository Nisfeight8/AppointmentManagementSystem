package appointments.management.system.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import appointments.management.system.entities.Appointment;
import appointments.management.system.services.AppointmentService;
import appointments.management.system.services.CarrierService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	CarrierService carrierService;
	@Autowired
	AppointmentService appService;
	
	@GetMapping("/carriers/{id}/appointments")
	@ResponseBody
	public Collection<Appointment> AppointmentsByCarrier(@PathVariable("id") int id) {
		return appService.findByCarrierId(id);
	}
	@PutMapping("/carriers/{id}/appointments/{id2}/approve")
	@ResponseBody
	public Appointment Carriers(@PathVariable("id2") int id,@RequestBody Appointment app) {
		Appointment appointment=appService.findById(id);
		appointment.setApproved(app.isApproved());
		return appService.update(appointment);
	}
}
