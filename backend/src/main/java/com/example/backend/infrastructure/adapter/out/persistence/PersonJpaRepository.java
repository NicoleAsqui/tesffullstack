package com.example.backend.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.domain.model.Person;

interface PersonJpaRepository extends JpaRepository<Person, Integer> {
}
