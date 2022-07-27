import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Order } from './Orders.js';
import { Package } from './Packages.js';

export const OrderItem = sequelize.define('order_item', {
	// price: {
	// 	type: DataTypes.DECIMAL(10,2),
	// 	allowNull: true,
	// },
	quantity: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
		defaultValue: 1,
	}
}, {
	timestamps: false,
	// tableName: 'Order_Items',
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

OrderItem.hasOne(Package);
Package.belongsTo(OrderItem);