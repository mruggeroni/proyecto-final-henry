import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const OrderItem = sequelize.define('order_item', {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	}
}, {
	timestamps: false,
});
