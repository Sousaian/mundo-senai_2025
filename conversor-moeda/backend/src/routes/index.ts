// src/routes/index.ts
import { Router } from 'express';
import { getMoedasDisponiveis } from '../controllers/moedaController';
import { converter } from '../controllers/conversaoController';

const router = Router();

// Rota para listar moedas ou buscar dados triviais de um par específico
// Exemplo:
//   - GET /api/moedas               => retorna todas as disponíveis
//   - GET /api/moedas?simbolo=USD-BRL => retorna dados de USD-BRL
router.get('/moedas', getMoedasDisponiveis);

// Rota para converter de uma moeda para outra
// Exemplo:
//   - GET /api/converter?from=USD&to=BRL&amount=100
router.get('/converter', converter);

export default router;
