// src/controllers/conversaoController.ts
import { Request, Response, NextFunction } from 'express';
import { obterCotacao } from '../services/awesomeApiService';

interface QueryConversao {
  from?: string;
  to?: string;
  amount?: string;
}

export async function converter(req: Request<{}, {}, {}, QueryConversao>, res: Response, next: NextFunction) {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({ error: "Parâmetros 'from', 'to' e 'amount' são obrigatórios. Ex.: /converter?from=USD&to=BRL&amount=100" });
    }

    // Normaliza os parâmetros
    const moedaFrom = from.toUpperCase();
    const moedaTo = to.toUpperCase();
    const valor = parseFloat(amount);

    if (isNaN(valor)) {
      return res.status(400).json({ error: "O parâmetro 'amount' deve ser um número válido." });
    }

    const par = `${moedaFrom}-${moedaTo}`;
    const dados = await obterCotacao(par);
    const chave = par.replace('-', '');

    if (!dados[chave]) {
      return res.status(404).json({ error: `Cotação para o par '${par}' não encontrada.` });
    }

    const cotacao = parseFloat(dados[chave].bid); // usamos o valor 'bid' (compra) para converter
    const convertido = valor * cotacao;

    // Monta resposta fácil de consumir
    return res.status(200).json({
      from: moedaFrom,
      to: moedaTo,
      amount: valor,
      rate: cotacao,
      converted: parseFloat(convertido.toFixed(6)), // arredondar em 6 casas decimais (opcional)
      timestamp: dados[chave].timestamp,
      info: dados[chave]
    });
  } catch (err: any) {
    next(err);
  }
}
