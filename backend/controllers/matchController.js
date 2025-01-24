import MatchService from '../services/matchService.js';

export const findMatches = async (req, res, next) => {
    try {
        const { campaignId } = req.params;
        const matches = await MatchService.findMatches(campaignId);
        res.status(200).json(matches);
    } catch (error) {
        next(error);
    }
};
