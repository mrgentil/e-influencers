import Performance from '../models/performanceModel.js';
import {updatePerformance} from "../services/performanceService.js";

/**
 * Obtenir les performances d'une campagne par son ID
 */
export const getPerformanceByCampaign = async (req, res) => {
    const { campaignId } = req.params;

    try {
        const performance = await Performance.findOne({ where: { campaign_id: campaignId } });

        if (!performance) {
            return res.status(404).json({ success: false, message: 'Performance introuvable pour cette campagne.' });
        }

        res.status(200).json({ success: true, data: performance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Ajouter une performance à une campagne
 */
export const createPerformance = async (req, res) => {
    const { campaignId } = req.params;
    const { views = 0, clicks = 0, conversions = 0, engagement_rate = 0, revenue_generated = 0 } = req.body;

    try {
        const performance = await Performance.create({
            campaign_id: campaignId,
            views,
            clicks,
            conversions,
            engagement_rate,
            revenue_generated,
        });

        res.status(201).json({ success: true, data: performance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Mettre à jour les métriques de performance d'une campagne
export const updateCampaignPerformance = async (req, res) => {
    const { campaignId } = req.params;
    const { views, clicks, conversions } = req.body;

    try {
        // On appelle le service pour mettre à jour les performances
        const updatedPerformance = await updatePerformance(campaignId, {
            views: views || 0,
            clicks: clicks || 0,
            conversions: conversions || 0,
        });

        res.status(200).json({
            success: true,
            message: 'Performances updated successfully',
            data: updatedPerformance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating performance',
        });
    }
};

/**
 * Supprimer les performances d'une campagne
 */
export const deletePerformance = async (req, res) => {
    const { campaignId } = req.params;

    try {
        const performance = await Performance.findOne({ where: { campaign_id: campaignId } });

        if (!performance) {
            return res.status(404).json({ success: false, message: 'Performance introuvable pour cette campagne.' });
        }

        await performance.destroy();
        res.status(200).json({ success: true, message: 'Les performances ont été supprimées avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
