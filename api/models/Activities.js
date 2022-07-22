// En esta tabla se definen las actividades que pueden incluir
// los paquetes vacacionales.
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Classification } from './Classification.js';
//import { Package } from './Packages.js';

export const Activity = sequelize.define('activitie', {
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
		type: DataTypes.INTEGER,
	},
}, {
	timestamps: false,
});
Activity.hasOne(Classification)
Activity.belongsTo(Classification, {foreignKey: 'id'})
