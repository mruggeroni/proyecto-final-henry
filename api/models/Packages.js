//RUTA EXCLUSIVA PARA CARGAR DATOS A LA DATABASE

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Destination } from './Destinations.js';
import { Activity } from './Activities.js';
export const Package = sequelize.define('package', {
	name: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.TEXT
	},
	main_image: {
		type: DataTypes.STRING,
		defaultValue: 'https://demos.maperez.es/default-main-image.jpg',
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: true,
	},
	price: {
		type: DataTypes.INTEGER
	},
	featured: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	available: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	on_sale: {
		type: DataTypes.INTEGER,
	}
}, {
	timestamps: false
});
Package.belongsToMany(Destination, {through: 'Package_Destination'})
Destination.belongsToMany(Package, {through: 'Package_Destination'})
Package.belongsToMany(Activity, {through: 'Package_Activity'})
Activity.belongsToMany(Package, {through: 'Package_Activity'})
