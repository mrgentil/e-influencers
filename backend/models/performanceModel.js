import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Performance extends Model {}

Performance.init({
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
    },
    clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
    },
    conversions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
    },
    engagement_rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 100,
        },
    },
    revenue_generated: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: { min: 0 },
    },
}, {
    sequelize,
    modelName: 'Performance',
    timestamps: true,
});

// Importation différée pour éviter les dépendances circulaires
const Campaign = await import('./campaignModel.js').then(module => module.default);

Performance.belongsTo(Campaign, { foreignKey: 'campaign_id', as: 'Campaign', onDelete: 'CASCADE' });
Campaign.hasOne(Performance, { foreignKey: 'campaign_id', as: 'Performance' });

export default Performance;
