package com.chat.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.boot.model.entitys.HistoricoEntity;
import com.chat.boot.model.input.HistoricoInput;
import com.chat.boot.services.HistoricoService;



@RestController
@RequestMapping("/historico")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    @GetMapping()
    public List<HistoricoEntity> listar () {
        return historicoService.listarHistorico();
    }

    @PostMapping()
    public HistoricoEntity salvar(@RequestBody HistoricoInput input) {
        return historicoService.salvarHistorico(input);
    }
    
    @DeleteMapping()
    public void deletar() {
        historicoService.deletarHistorico();
    }

}
