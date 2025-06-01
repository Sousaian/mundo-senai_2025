package com.chat.boot.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chat.boot.model.entitys.HistoricoEntity;

@Repository
public interface HistoricoRepository extends JpaRepository<HistoricoEntity, Integer> {

}
