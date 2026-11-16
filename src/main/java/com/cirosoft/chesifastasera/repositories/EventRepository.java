package com.cirosoft.chesifastasera.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cirosoft.chesifastasera.models.Event;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event>{

}
