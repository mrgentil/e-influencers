import express from 'express';
import { findMatches } from '../controllers/matchController.js';

const router = express.Router();

router.get('/campaign/:campaignId/matches', findMatches);

export default router;
