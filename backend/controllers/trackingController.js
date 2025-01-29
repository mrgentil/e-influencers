import Click from '../models/clickModel.js';
import Conversion from '../models/conversionModel.js';
import { updatePerformance } from '../services/performanceService.js';

/**
 * Tracker les clics sur les campagnes
 */
export const trackClick = async (req, res) => {
    const { campaignId, ref } = req.query;

    try {
        await Click.create({
            campaign_id: campaignId,
            influencer_ref: ref,
        });

        // Mettre à jour la performance après un clic
        await updatePerformance(campaignId);

        res.redirect(`https://ma-plateforme.com/campagne/${campaignId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de tracking' });
    }
};

/**
 * Tracker les conversions
 */
export const trackConversion = async (req, res) => {
    const { campaignId, ref, action } = req.body;

    try {
        await Conversion.create({
            campaign_id: campaignId,
            influencer_ref: ref,
            action,
        });

        // Mettre à jour la performance après une conversion
        await updatePerformance(campaignId);

        res.status(201).json({ message: 'Conversion enregistrée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de tracking conversion' });
    }
};
