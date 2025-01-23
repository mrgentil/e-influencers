import { sequelize } from './config/db.js';
import User from './models/userModel.js';
import Influencer from './models/influenceurModel.js';
import Campaign from './models/campaignModel.js';
import Match from './models/matchModel.js';
import Performance from './models/performanceModel.js';
import Transaction from './models/transactionModel.js';

(async () => {
    try {
        // Synchroniser tous les modèles
        await sequelize.sync({ force: false }); // `force: true` réinitialise les tables (attention à ne pas perdre de données en prod)
        console.log('La base de données a été synchronisée avec succès.');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la synchronisation avec la base de données:', error);
        process.exit(1);
    }
})();
