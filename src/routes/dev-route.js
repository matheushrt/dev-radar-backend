import express from 'express';
const router = express.Router();

import { devController } from '../controllers';

router.post('/', devController.createDev);

export default router;
