import express from 'express';
import {
    getPerformanceByCampaign,
    createPerformance,
    deletePerformance, updateCampaignPerformance
} from '../controllers/performanceController.js';

const router = express.Router();

router.get('/:campaignId', getPerformanceByCampaign); // Récupérer les performances d'une campagne
router.post('/:campaignId', createPerformance); // Ajouter une nouvelle performance à une campagne
router.put('/:campaignId', updateCampaignPerformance); // Mettre à jour les performances d'une campagne
router.delete('/:campaignId', deletePerformance); // Supprimer les performances d'une campagne

export default router;
