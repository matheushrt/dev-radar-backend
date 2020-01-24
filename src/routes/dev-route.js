import express from 'express';
const router = express.Router();

import { devController } from '../controllers';

router.post('/', devController.createDev);
router.get('/', devController.getAllDevs);
router.get('/search', devController.searchDevs);

export default router;
