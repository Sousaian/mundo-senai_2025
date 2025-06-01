package com.chat.boot.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.boot.model.entitys.HistoricoEntity;
import com.chat.boot.model.input.HistoricoInput;
import com.chat.boot.repositorys.HistoricoRepository;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoRepository historicoRepository;

    public List<HistoricoEntity> listarHistorico() {
        return historicoRepository.findAll();
    }

    public HistoricoEntity salvarHistorico(HistoricoInput input) {
        HistoricoEntity historico = new HistoricoEntity();
        historico.setUser(input.getUsuario());
        historico.setConversa(input.getConversa());
        historico.setData(new java.sql.Timestamp(System.currentTimeMillis()));

        return historicoRepository.save(historico);
    }

    public void deletarHistorico() {
        historicoRepository.deleteAll();
    }

}
