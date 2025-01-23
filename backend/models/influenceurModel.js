import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js';

class Influencer extends Model {}

Influencer.init({
    reseaux_sociaux: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            isValidSocials(value) {
                if (!Array.isArray(value)) {
                    throw new Error('reseaux_sociaux doit être un tableau.');
                }
            },
        },
    },
    audience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    taux_engagement: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
    localisation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Influencer',
    timestamps: true,
});

Influencer.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
export default Influencer;
