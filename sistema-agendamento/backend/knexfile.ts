import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'src', 'database', 'database.sqlite') // Arquivo na mesma pasta do knexfile
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'src', 'database', 'migrations'),
    extension: 'ts'
  },
  seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
        extension: 'ts'
  },
};