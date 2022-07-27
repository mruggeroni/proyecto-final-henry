//RUTA EXCLUSIVA PARA CARGAR DATOS A LA DATABASE

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Destination } from './Destinations.js';
import { Activity } from './Activities.js';
export const Package = sequelize.define('package', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	main_image: {
		type: DataTypes.STRING,
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    start_date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
    end_date: {
		type: DataTypes.DATEONLY,
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
			"América Central"
		),
		allowNull: false,
	},
    seasson: {
		type: DataTypes.ENUM(
			"Verano",
			"Otoño",
			"Invierno",
			"Primavera",
			"Especial"
		),
		allowNull: false,
	},
    type: {
		type: DataTypes.ENUM(
			"Crucero",
			"Pack Short",
			"Pack Large",
			"Multidestino"
		),
		allowNull: false,
	},
	featured: {
		type: DataTypes.BOOLEAN,

	},
	available: {
		type: DataTypes.BOOLEAN,

	},
	on_sale: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
}, {
	timestamps: true,
  createdAt: false,
  updatedAt: false,
	paranoid:true,
	deletedAt: 'destroyTime'
});
Package.belongsToMany(Destination, {through: 'Package_Destination'})
Destination.belongsToMany(Package, {through: 'Package_Destination'})
Package.belongsToMany(Activity, {through: 'Package_Activity'})
Activity.belongsToMany(Package, {through: 'Package_Activity'})
