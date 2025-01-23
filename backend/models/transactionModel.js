import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import Campaign from './campaignModel.js';
import User from './userModel.js';

class Transaction extends Model {}

Transaction.init({
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
    },
    statut: {
        type: DataTypes.ENUM('En attente', 'Effectué', 'Annulé'),
        allowNull: false,
        defaultValue: 'En attente',
    },
    date_paiement: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true,
    indexes: [
        { fields: ['campaign_id'] },
        { fields: ['influencer_id'] },
    ],
});

Transaction.belongsTo(Campaign, { foreignKey: 'campaign_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'influencer_id', onDelete: 'CASCADE' });

export default Transaction;
