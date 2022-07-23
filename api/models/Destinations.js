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
	}
}, {
	timestamps: false,
});
