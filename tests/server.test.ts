import request from 'supertest'; 
import { Express } from 'express';
import { app } from '../src/server'; 

let appTest: Express;

beforeAll(() => {
  //start o server para os tests
  appTest = app;
});

describe('Server Tests', () => {
  test('should return 404 for unknown route', async () => {
    const response = await request(app).get('/unknownroute');
    expect(response.status).toBe(404);
  });

});