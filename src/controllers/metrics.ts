import { Request, Response } from 'express';
import { register } from 'prom-client';

export const scrapeMetrics = async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};