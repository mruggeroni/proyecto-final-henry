// En esta tabla se definen las actividades que pueden incluir
// los paquetes vacacionales.
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Activity = sequelize.define('activities', {
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	image: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.DECIMAL(10,2),
	}
}, {
	timestamps: false,
});