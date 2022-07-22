// En esta tabla se definen las categorías de los paquetes vacacionales.
// Estos pueden ser: Crucero, Tour, Estancia?
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Category = sequelize.define('categories', {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	}
}, {
	timestamps: false,
});