// src/index.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import routes from './routes';
import cors from 'cors';


const app: Application = express();
const PORT = 3000;

// Habilita o JSON no corpo das requisições (se for necessário no futuro)
app.use(express.json());

app.use(cors());


// Registra as rotas
app.use('/api', routes);

// Rota raiz (opcional) para verificar se servidor está no ar
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API de Cotações está no ar!' });
});

// Middleware de tratamento de erros genérico
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
