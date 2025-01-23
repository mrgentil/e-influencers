import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import Campaign from './campaignModel.js';

import User from './userModel.js';

class Match extends Model {}

Match.init({
    statut: {
        type: DataTypes.ENUM('En attente', 'Acceptée', 'Rejetée'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Match',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['campaign_id', 'influencer_id'] },
    ],
});

Match.belongsTo(Campaign, { foreignKey: 'campaign_id', onDelete: 'CASCADE' });
Match.belongsTo(User, { foreignKey: 'influencer_id', onDelete: 'CASCADE' });

export default Match;
