package com.example.backend.infrastructure.adapter.in.web;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.application.dto.ApiResponse;
import com.example.backend.application.service.PersonService;
import com.example.backend.domain.model.Person;

@RestController
@RequestMapping("/person")
public class PersonController {

	private final PersonService personService;

	public PersonController(PersonService personService) {
		this.personService = personService;
	}

	@GetMapping
	public ApiResponse<Person> getAll() {
		List<Person> people = personService.findAll();
		return ApiResponse.ok("Consulta realizada correctamente", people);
	}

	@GetMapping("/{id}")
	public ApiResponse<Person> getById(@PathVariable Integer id) {
		return personService.findById(id)
				.map(person -> ApiResponse.ok("Registro encontrado", List.of(person)))
				.orElseGet(() -> ApiResponse.error("No se encontró la persona con id " + id));
	}

	@PostMapping
	public ApiResponse<Person> create(@RequestBody Person person) {
		try {
			Person saved = personService.create(person);
			return ApiResponse.ok("Persona creada correctamente", List.of(saved));
		} catch (Exception ex) {
			return ApiResponse.error("Error al crear la persona: " + ex.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ApiResponse<Person> update(@PathVariable Integer id, @RequestBody Person person) {
		try {
			return personService.update(id, person)
					.map(updated -> ApiResponse.ok("Persona actualizada correctamente", List.of(updated)))
					.orElseGet(() -> ApiResponse.error("No se encontró la persona con id " + id));
		} catch (Exception ex) {
			return ApiResponse.error("Error al actualizar la persona: " + ex.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ApiResponse<Person> delete(@PathVariable Integer id) {
		try {
			return personService.delete(id)
					.map(deleted -> ApiResponse.ok("Persona eliminada correctamente", List.of(deleted)))
					.orElseGet(() -> ApiResponse.error("No se encontró la persona con id " + id));
		} catch (Exception ex) {
			return ApiResponse.error("Error al eliminar la persona: " + ex.getMessage());
		}
	}
}
