package com.chat.boot.model.input;

import com.chat.boot.model.enums.EnumUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoricoInput {

    private EnumUser usuario;
    private String conversa;

}
