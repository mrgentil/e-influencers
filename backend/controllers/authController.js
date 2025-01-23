import User from '../models/userModel.js';
import generateToken from '../utils/createToken.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import jwt from "jsonwebtoken";

// Inscription
export const register = async (req, res) => {
    try {
        const {name, email, phone, role, password} = req.body;

        console.log('Received data:', {name, email, phone, role, password});

        if (!name || !email || !password || !role || !phone) {
            return res.status(400).json({message: 'Veuillez remplir tous les champs obligatoires'});
        }

        const userExists = await User.findOne({where: {email}});
        if (userExists) {
            return res.status(400).json({message: 'Cet utilisateur existe déjà'});
        }

        const user = await User.create({
            name,
            email,
            phone,
            role,
            password: await bcrypt.hash(password, 10)
        });


        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(201).json({token, user});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur lors de l'enregistrement de l'utilisateur"});
    }
};

// Connexion
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {email}
        });
        if (!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé'});
        }

        const isMatch = await user.comparePassword(password);
        console.log('Mot de passe comparé:', isMatch); // Vérifiez si isMatch renvoie true ou false
        if (!isMatch) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
        }

        // Générer un token JWT
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, user});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erreur lors de la connexion'});
    }
};

// Déconnexion
export const logout = (req, res) => {
    res.status(200).json({message: 'Déconnexion réussie'});
};

// Récupération du mot de passe (placeholder)
export const forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Implémentation future avec un service de messagerie
    res.status(200).json({message: 'Lien de récupération envoyé (fonctionnalité à venir)'});
};

// Lister les utilisateurs par type
export const listUsers = async (req, res) => {
    const {role} = req.query; // Ex: ?role=Marque

    try {
        const query = role ? {where: {role}} : {};
        const users = await User.findAll(query);

        res.status(200).json({
            message: 'Liste des utilisateurs récupérée avec succès',
            users
        });
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur', error});
    }
};

// Mettre à jour un utilisateur
export const update = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.phone = req.body.phone || user.phone;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
};

// Obtenir un utilisateur par ID
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération du profil.' });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }

        await user.destroy();
        res.status(204).json(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};