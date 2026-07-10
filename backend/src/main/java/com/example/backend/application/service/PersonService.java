package com.example.backend.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Person;
import com.example.backend.domain.port.out.PersonRepositoryPort;

@Service
public class PersonService {

	private final PersonRepositoryPort personRepository;

	public PersonService(PersonRepositoryPort personRepository) {
		this.personRepository = personRepository;
	}

	public List<Person> findAll() {
		return personRepository.findAll();
	}

	public Optional<Person> findById(Integer id) {
		return personRepository.findById(id);
	}

	public Person create(Person person) {
		person.setId(null);
		return personRepository.save(person);
	}

	public Optional<Person> update(Integer id, Person incoming) {
		Optional<Person> existingOpt = personRepository.findById(id);
		if (existingOpt.isEmpty()) {
			return Optional.empty();
		}

		Person existing = existingOpt.get();
		if (incoming.getNombre() != null) {
			existing.setNombre(incoming.getNombre());
		}
		if (incoming.getApellido() != null) {
			existing.setApellido(incoming.getApellido());
		}
		if (incoming.getFechaNacimiento() != null) {
			existing.setFechaNacimiento(incoming.getFechaNacimiento());
		}
		if (incoming.getPuesto() != null) {
			existing.setPuesto(incoming.getPuesto());
		}
		if (incoming.getSueldo() != null) {
			existing.setSueldo(incoming.getSueldo());
		}

		return Optional.of(personRepository.save(existing));
	}

	public Optional<Person> delete(Integer id) {
		Optional<Person> existing = personRepository.findById(id);
		if (existing.isEmpty()) {
			return Optional.empty();
		}
		personRepository.deleteById(id);
		return existing;
	}
}
