import express from 'express';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';
import knex from './database/connection'; // Ajuste o caminho conforme sua estrutura

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

/// Teste de conexão
knex.raw('SELECT 1+1 AS result')
  .then(() => console.log('✅ Banco conectado com sucesso!'))
  .catch(err => console.error('❌ Falha na conexão:', err.message));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});