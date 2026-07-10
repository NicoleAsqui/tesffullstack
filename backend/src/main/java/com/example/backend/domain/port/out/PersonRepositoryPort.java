package com.example.backend.domain.port.out;

import java.util.List;
import java.util.Optional;

import com.example.backend.domain.model.Person;

public interface PersonRepositoryPort {

	List<Person> findAll();

	Optional<Person> findById(Integer id);

	boolean existsById(Integer id);

	Person save(Person person);

	void deleteById(Integer id);
}
