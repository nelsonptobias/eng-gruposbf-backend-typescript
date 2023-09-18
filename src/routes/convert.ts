import express from 'express';
import controller from '../controllers/convert';
const router = express.Router();

router.get('/convert/:id/:value', controller.getConvert);


export = router;