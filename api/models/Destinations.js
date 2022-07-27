import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';


export const Destination = sequelize.define('destination', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	region: {
		type: DataTypes.ENUM(
			"Europa Occidental",
			"Europa Central",
			"Europa Oriental",
			"Asia Oriental",
			"Asia del Sur",
			"Asia Sudoriental Continental",
			"Norte América",
			"Sudamérica",
			"América Central",
		),
		allowNull: false,
	},
}, {
	timestamps: false,
});
