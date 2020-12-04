package appointments.management.system.services.impl;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import appointments.management.system.entities.Citizen;
import appointments.management.system.entities.Citizen;
import appointments.management.system.repositories.CitizenRepository;
import appointments.management.system.services.CitizenService;
@Service
@Transactional
public class CitizenServiceImpl implements CitizenService {

	@Autowired
    private CitizenRepository citizenRepository;
    @Override
    public Citizen save(Citizen citizen) {
        return citizenRepository.save(citizen);
    }

    @Override
    public Boolean delete(int id) {
        if (citizenRepository.existsById(id)) {
            citizenRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Citizen update(Citizen citizen) {
        return citizenRepository.save(citizen);
    }

    @Override
    public Citizen findById(int id) {
        return citizenRepository.findById(id).get();
    }
    @Override
    public Citizen findByUserName(String Username) {
        return citizenRepository.findByUsername(Username);
    }
    @Override
    public Citizen findByEmail(String email) {
        return citizenRepository.findByEmail(email);
    }

    @Override
    public Collection<Citizen> findAll() {
        Iterable<Citizen> itr = citizenRepository.findAll();
        return (Collection<Citizen>) itr;
    }

}
