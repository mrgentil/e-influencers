import express from 'express';
import {
    register,
    login,
    getUserProfile,
    logout, listUsers, searchInfluencers,
} from '../controllers/userController.js';
import {protect, admin} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Routes protégées
router.get('/:id', protect, getUserProfile);
router.get('/', protect, admin, listUsers);
// Route pour la recherche d'influenceurs
router.get('/search', protect, searchInfluencers);

export default router;
