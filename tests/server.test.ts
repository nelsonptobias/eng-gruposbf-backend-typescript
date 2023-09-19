import request from 'supertest'; 
import { Express } from 'express';
import { app } from '../src/server'; 
import { httpServer } from '../src/server';

let appTest: Express;

beforeAll(() => {
  //start o server para os tests
  appTest = app;
});

afterAll(done => {
  // Fecha o servidor após os testes
  httpServer.close(() => {
    done();
  });
});

describe('Server Tests', () => {
  test('should return 404 for unknown route', async () => {
    const response = await request(app).get('/unknownroute');
    expect(response.status).toBe(404);
  });

  test('should return converted values for /convert/:id/:value', async () => {
    const response = await request(app).get('/convert/USD/10');
    expect(response.status).toBe(200);
  });

});