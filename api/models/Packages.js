import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Destination } from './Destinations.js';
import { Activity } from './Activities.js';
import { Order } from './Orders.js';
<<<<<<< HEAD
=======

>>>>>>> debcfb8a89f842306509839fa8d32bdb02c0cf39
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
<<<<<<< HEAD
export const OrderItem = sequelize.define('order_item', {
	// price: {
	// 	type: DataTypes.DECIMAL(10,2),
	// 	allowNull: true,
	// },
	quantity: {
		type: DataTypes.INTEGER(10),
=======

export const OrderItem = sequelize.define('order_item', {
	quantity: {
		type: DataTypes.INTEGER,
>>>>>>> debcfb8a89f842306509839fa8d32bdb02c0cf39
		allowNull: false,
		defaultValue: 1,
	}
}, {
	timestamps: false,
<<<<<<< HEAD
	// tableName: 'Order_Items',
}

);
Package.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Package, {through: OrderItem})
=======
});

Package.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Package, {through: OrderItem})

>>>>>>> debcfb8a89f842306509839fa8d32bdb02c0cf39
Package.belongsToMany(Destination, {through: 'Package_Destination'})
Destination.belongsToMany(Package, {through: 'Package_Destination'})

Package.belongsToMany(Activity, {through: 'Package_Activity'})
Activity.belongsToMany(Package, {through: 'Package_Activity'})
