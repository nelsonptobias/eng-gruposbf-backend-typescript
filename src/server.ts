import { Express } from 'express';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { clientRedis } from './services/redis.conect'

const envPath = path.resolve(__dirname, '../config/.env');
dotenv.config({ path: envPath }); 

const client = clientRedis

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Verificar a conexão bem-sucedida
client.on('connect', () => {
  console.log('Connected to Redis');
});

//legal citar que não sei pq, se eu faço esse import antes, ele nao consegue passar as váriaveis de ambiente pra frente
import routes from './routes/convert';

const app: Express = express();

/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

/** Routes */
app.use('/', routes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 8000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export { app, httpServer, client }; 
