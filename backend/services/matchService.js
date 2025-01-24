import User from '../models/userModel.js';
import Campaign from '../models/campaignModel.js';

class MatchService {
    static async findMatches(campaignId) {
        const campaign = await Campaign.findByPk(campaignId);

        if (!campaign) {
            throw new Error('Campagne introuvable');
        }

        const influencers = await User.findAll({
            where: { role: 'Influenceur' },
        });

        const matches = influencers.map((influencer) => {
            let score = 0;

            // Correspondance de niche
            if (campaign.niche && campaign.niche === influencer.niche) score += 40;

            // Taux d'engagement
            score += (influencer.engagement_rate || 0) * 0.3;

            // Budget
            const budgetMatch = influencer.followers * 0.1 <= campaign.budget ? 20 : 0;
            score += budgetMatch;

            return { influencer, score };
        });

        return matches.sort((a, b) => b.score - a.score);
    }
}

export default MatchService;
