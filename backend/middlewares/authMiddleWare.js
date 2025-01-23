import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Campaign from "../models/campaignModel.js";

// Protéger les routes
const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Non autorisé, aucun token.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.userId);

        if (!req.user) {
            return res.status(401).json({message: 'Utilisateur non trouvé.'});
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({message: 'Token invalide.'});
    }
});

// Vérifier le rôle administrateur
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }
    res.status(403).json({message: 'Non autorisé en tant qu’administrateur.'});
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'Action interdite pour ce rôle'});
        }
        next();
    };
};

// Middleware pour vérifier si l'utilisateur est Admin ou Propriétaire
export const adminOrOwner = async (req, res, next) => {
    const campaign = await Campaign.findByPk(req.params.id);

    if (!campaign) {
        return res.status(404).json({message: "Campagne introuvable."});
    }

    // Vérifiez si l'utilisateur est Admin ou le propriétaire de la campagne
    if (req.user.role === 'Admin' || req.user.id === campaign.marque_id) {
        next();
    } else {
        res.status(403).json({message: "Non autorisé, accès refusé."});
    }
};

export {protect, admin};
