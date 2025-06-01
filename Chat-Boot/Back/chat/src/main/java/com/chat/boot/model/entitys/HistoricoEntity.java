package com.chat.boot.model.entitys;


import java.sql.Timestamp;

import com.chat.boot.model.enums.EnumUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "historico")
@Getter
@Setter
public class HistoricoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user")
    private EnumUser user;

    @Column(name = "conversa")
    private String conversa;

    @Column(name = "criado")
    private Timestamp data;
}
