import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Protéger les routes
const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Non autorisé, aucun token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token invalide.' });
    }
});

// Vérifier le rôle administrateur
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }
    res.status(403).json({ message: 'Non autorisé en tant qu’administrateur.' });
};

export { protect, admin };
