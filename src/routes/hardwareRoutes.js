import express from 'express';
import { getHardwares, rentHardware } from '../controllers/hardwareController.js';

const router = express.Router();

// Rota GET: /api/hardwares -> Lista tudo
router.get('/', getHardwares);

// Rota POST: /api/hardwares/:id/rent -> Aluga uma peça específica
router.post('/:id/rent', rentHardware);

export default router;