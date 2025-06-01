import express from 'express';
import cors from 'cors';
import convertRoute from './routes/convertRoute';
import currencyRoute from './routes/currencyRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/convert', convertRoute);
app.use('/api', currencyRoute); // Nova rota

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});