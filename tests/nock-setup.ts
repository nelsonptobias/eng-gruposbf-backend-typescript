import nock from 'nock';
import dotenv from 'dotenv';

// Carregue as variáveis de ambiente do arquivo .env.test
dotenv.config({ path: './config/.env.test' });

// Configure o nock para interceptar as requisições e fornecer as respostas desejadas
const mockedResponse = {
  rates: {
    USD: 1.2,
    EUR: 1.0,
  },
};

nock('https://api.test.example.com')
  .get('/api/latest')
  .query({ access_key: process.env.API_KEY? process.env.API_KEY :''})
  .reply(200, mockedResponse);

export { nock };