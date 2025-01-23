import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js';

class Campaign extends Model {}

Campaign.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 },
    },
    objectifs: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    date_debut: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { isDate: true },
    },
    date_fin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfterStart(value) {
                if (value <= this.date_debut) {
                    throw new Error('La date de fin doit être après la date de début.');
                }
            },
        },
    },
}, {
    sequelize,
    modelName: 'Campaign',
    timestamps: true,
});
Campaign.belongsTo(User, { foreignKey: 'marque_id', as: 'Marque', onDelete: 'CASCADE' });
User.hasMany(Campaign, { foreignKey: 'marque_id', as: 'campaigns' });

export default Campaign;
