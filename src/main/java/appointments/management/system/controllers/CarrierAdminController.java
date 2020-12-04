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

import appointments.management.system.entities.Carrier;
import appointments.management.system.services.CarrierService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@PreAuthorize("hasRole('ROLE_CARRIERADMIN')")
@RequestMapping("/carrierAdmin")
public class CarrierAdminController {
	@Autowired
	CarrierService carrierService;
	
	@GetMapping("/carriers")
	@ResponseBody
	public Collection<Carrier> GetCarriers() {
		return carrierService.findAll();
	}
	@PutMapping("/carriers/{id}/approve")
	@ResponseBody
	public Carrier ApproveCarrier(@PathVariable("id")int id,@RequestBody Carrier carr) {
		Carrier carrier=carrierService.findById(id);
		carrier.setApproved(carr.isApproved());
		return carrierService.update(carrier);
	}
}
