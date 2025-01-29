// services/performanceService.js
import Performance from '../models/performanceModel.js';

// Mettre à jour les métriques de performance d'une campagne
export const updatePerformance = async (campaignId, updates) => {
    const performance = await Performance.findOne({ where: { campaign_id: campaignId } });

    if (!performance) {
        // Si aucune performance n'est trouvée, on la crée
        return Performance.create({
            campaign_id: campaignId,
            views: updates.views || 0,
            clicks: updates.clicks || 0,
            conversions: updates.conversions || 0,
        });
    }

    // Mise à jour des métriques existantes
    if (updates.views) {
        performance.views += updates.views;
    }
    if (updates.clicks) {
        performance.clicks += updates.clicks;
    }
    if (updates.conversions) {
        performance.conversions += updates.conversions;
    }

    await performance.save();
    return performance;
};
