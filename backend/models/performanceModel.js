import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import Campaign from './campaignModel.js';
import User from './userModel.js';

class Performance extends Model {}

Performance.init({
    portee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    clics: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    conversions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
    },
    engagement: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0, max: 100 },
    },
}, {
    sequelize,
    modelName: 'Performance',
    timestamps: true,
});

Performance.belongsTo(Campaign, { foreignKey: 'campaign_id', onDelete: 'CASCADE' });
Performance.belongsTo(User, { foreignKey: 'influencer_id', onDelete: 'CASCADE' });

export default Performance;
