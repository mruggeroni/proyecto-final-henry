import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const User = sequelize.define('user', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
        allowNull: false,
		unique: true,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true,
	},
    phone: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},

	is_admin: {
		type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,

	},
	photo: {
		type: DataTypes.STRING,
        allowNull: true,
	},
}, {
	timestamps: false
});
