import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { User } from './Users.js'

export const Order = sequelize.define('order', {
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	total_order: {
		type: DataTypes.DECIMAL(10,1),
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('shopping cart', 'pending', 'paid', 'cancel'),
		defaultValue: 'shopping cart',
	},
}, {
	timestamps: false,
});

User.hasMany(Order);
Order.belongsTo(User);
