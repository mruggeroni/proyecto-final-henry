import { DataTypes, STRING } from 'sequelize';
import { sequelize } from '../db.js';
 import { Classification } from './Classification.js';
//import { Package } from './Packages.js';

export const User = sequelize.define('user', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	full_name: {
		type: DataTypes.VIRTUAL,
		get() {
			return `${this.first_name} ${this.last_name}`;
		},
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address_line1: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address_line2: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	postal_code: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
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
	timestamps: false,
});
