// routes/currencyRoute.ts
import { Router } from 'express';
import { getAvailableCurrencies } from '../services/currencyList';

const router = Router();

router.get('/currencies', async (req, res) => {
  try {
    const moedas = await getAvailableCurrencies();
    res.json({ moedas_disponiveis: moedas });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter lista de moedas' });
  }
});

export default router;