package com.example.backend.infrastructure.adapter.out.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.domain.model.Person;
import com.example.backend.domain.port.out.PersonRepositoryPort;

@Repository
public class PersonRepositoryAdapter implements PersonRepositoryPort {

	private final PersonJpaRepository jpaRepository;

	public PersonRepositoryAdapter(PersonJpaRepository jpaRepository) {
		this.jpaRepository = jpaRepository;
	}

	@Override
	public List<Person> findAll() {
		return jpaRepository.findAll();
	}

	@Override
	public Optional<Person> findById(Integer id) {
		return jpaRepository.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return jpaRepository.existsById(id);
	}

	@Override
	public Person save(Person person) {
		return jpaRepository.save(person);
	}

	@Override
	public void deleteById(Integer id) {
		jpaRepository.deleteById(id);
	}
}
