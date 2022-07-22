import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';


export const Destination = sequelize.define('destination', {
	name: {
		type: DataTypes.STRING,
	},
	image: {
		type: DataTypes.STRING,
	}
}, {
	timestamps: false,
});
