import nock from 'nock';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env.test' });

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