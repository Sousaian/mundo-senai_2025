import { Router } from 'express';
import { convertCurrency } from '../services/currencyService';

const router = Router();

router.get('/', async (req, res) => {
  const { from = 'BRL', to, amount } = req.query;

  if (!to || !amount) {
    return res.status(400).json({ error: 'Parâmetros "to" e "amount" são obrigatórios.' });
  }

  // Validação do valor numérico
  if (isNaN(Number(amount))) {
    return res.status(400).json({ error: '"amount" deve ser um número válido.' });
  }

  try {
    const resultado = await convertCurrency(
      from.toString().toUpperCase(), 
      to.toString().toUpperCase(), 
      parseFloat(amount.toString())
    );
    return res.json(resultado);
  } catch (error: any) {
    return res.status(500).json({ 
      error: error.message || 'Erro ao converter moeda.' 
    });
  }
});

export default router;