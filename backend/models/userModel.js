import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js';

class User extends Model {
    async comparePassword(enteredPassword) {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isNumeric: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Marque', 'Influenceur','Admin'),
        allowNull: false,
    },
    niche: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        },
    },
    followers: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
        },
    },
    engagement_rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 100,
        },
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password') && !user.password.startsWith('$2a$')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    }

});

export default User;
