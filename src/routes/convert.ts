import express from 'express';
import controller from '../controllers/convert';
import { scrapeMetrics } from '../controllers/metrics';
const router = express.Router();

router.get('/convert/:id/:value', controller.getConvert);
router.get('/metrics', scrapeMetrics);

export = router;