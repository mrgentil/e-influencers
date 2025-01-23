import Campaign from '../models/campaignModel.js';

export const createCampaign = async (req, res) => {
    try {
        const {title, description, budget, objectifs, date_debut, date_fin} = req.body;
        const userId = req.user.id;
        // Création de la campagne
        const campaign = await Campaign.create({
            title,
            description,
            budget,
            objectifs,
            date_debut,
            date_fin,
            marque_id: userId, // L'utilisateur connecté
        });

        res.status(201).json({success: true, data: campaign});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false, message: error.message});
    }
};

// Obtenir toutes les campagnes
export const getAllCampaigns = async (req, res) => {
    const campaigns = await Campaign.findAll();
    res.status(200).json({success: true, data: campaigns});
};

// Obtenir une seule campagne
export const getCampaignById = async (req, res) => {
    const {id} = req.params;
    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
        return res.status(404).json({success: false, message: "Campagne introuvable."});
    }

    res.status(200).json({success: true, data: campaign});
};

// Modifier une campagne
export const updateCampaign = async (req, res) => {
    const {id} = req.params;
    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
        return res.status(404).json({success: false, message: "Campagne introuvable."});
    }

    if (req.user.role !== 'Admin' && req.user.id !== campaign.marque_id) {
        return res.status(403).json({success: false, message: "Non autorisé."});
    }

    await campaign.update(req.body);
    res.status(200).json({success: true, data: campaign});
};

// Supprimer une campagne
export const deleteCampaign = async (req, res) => {
    const {id} = req.params;
    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
        return res.status(404).json({success: false, message: "Campagne introuvable."});
    }

    if (req.user.role !== 'Admin' && req.user.id !== campaign.marque_id) {
        return res.status(403).json({success: false, message: "Non autorisé."});
    }

    await campaign.destroy();
    res.status(200).json({success: true, message: "La campagne a été supprimée avec succès."});
};
