// src/controllers/moedaController.ts
import { Request, Response, NextFunction } from 'express';
import { listarMoedasDisponiveis, obterCotacao } from '../services/awesomeApiService';

export async function getMoedasDisponiveis(req: Request, res: Response, next: NextFunction) {
  try {
    // Se o usuário passar um parâmetro "simbolo" (por ex. ?simbolo=USD-BRL), retornamos apenas aquele par
    const simbolo = (req.query.simbolo as string)?.toUpperCase();

    // Se não passou simbolo, retornamos todas as disponíveis
    if (!simbolo) {
      const todas = await listarMoedasDisponiveis();
      return res.status(200).json({ disponiveis: todas });
    }

    // Se passou um símbolo específico, vamos buscar a cotação atual desse par
    // Exemplo: simbolo = "USD-BRL" ou "EUR-BRL"
    const dadosCotacao = await obterCotacao(simbolo);
    // A chave do objeto retornado costuma ser sem hífen, ex: "USDBRL"
    const chave = simbolo.replace('-', '');
    if (dadosCotacao[chave]) {
      return res.status(200).json({ [chave]: dadosCotacao[chave] });
    } else {
      return res.status(404).json({ error: `Par de moeda '${simbolo}' não encontrado.` });
    }
  } catch (err: any) {
    next(err);
  }
}
