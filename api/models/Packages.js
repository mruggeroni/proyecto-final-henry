import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Category } from './Categories.js';

export const Package = sequelize.define('packages', {
	name: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
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
		type: DataTypes.DECIMAL(10,2)
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
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
}, {
	timestamps: false
});

Category.hasMany(Package);
Package.belongsTo(Category);