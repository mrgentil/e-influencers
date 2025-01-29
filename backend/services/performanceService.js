import Performance from '../models/performanceModel.js';
import Click from '../models/clickModel.js';
import Conversion from '../models/conversionModel.js';

/**
 * Mettre à jour les performances d'une campagne
 */
export const updatePerformance = async (campaignId) => {
    try {
        const clicks = await Click.count({ where: { campaign_id: campaignId } });
        const conversions = await Conversion.count({ where: { campaign_id: campaignId } });

        // Calcul du taux d'engagement
        const engagementRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

        // Mise à jour des performances
        const updatedPerformance = await Performance.update(
            { clicks, conversions, engagement_rate: engagementRate },
            { where: { campaign_id: campaignId } }
        );

        return updatedPerformance;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des performances :', error);
        throw error;
    }
};
