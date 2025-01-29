import express from 'express';
import { trackClick, trackConversion } from '../controllers/trackingController.js';

const router = express.Router();

router.get('/track-click', trackClick);
router.post('/track-conversion', trackConversion);

export default router;
