import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Conversion = sequelize.define('Conversion', {
    campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Campaigns', key: 'id' },
    },
    influencer_ref: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING, // Exemple: "Inscription", "Achat"
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, { timestamps: false });

export default Conversion;
