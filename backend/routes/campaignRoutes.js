import express from 'express';
import {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from '../controllers/campaignController.js';
import {adminOrOwner, protect, restrictTo} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Seules les marques peuvent créer une campagne
router.post('/create', protect, restrictTo('Marque','Admin'), createCampaign);
// Route pour obtenir toutes les campagnes
router.get('/', protect, getAllCampaigns);

// Route pour obtenir une seule campagne
router.get('/:id', protect, getCampaignById);

// Route pour modifier une campagne
router.put('/:id', protect, adminOrOwner, updateCampaign);

// Route pour supprimer une campagne
router.delete('/:id', protect, adminOrOwner, deleteCampaign);


export default router;
