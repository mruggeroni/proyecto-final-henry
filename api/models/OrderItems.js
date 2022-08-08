import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Activity } from './Activities.js';


export const OrderItem = sequelize.define('order_item', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
	total: {
		type: DataTypes.DECIMAL(10,2),
		allowNull: true,
		defaultValue: 1000,
	}
	// price_package: {
	// 	type: DataTypes.VIRTUAL,
	// 	get() {
	// 		return this.total_package / this.quantity;
	// 	},
	// },
	// total_package: {
	// 	type: DataTypes.INTEGER,
	// 	defaultValue: null,
	// },
}, {
	timestamps: false,
	freezeTableName: true,
	paranoid: true,
	deletedAt: 'destroyTime',
});

Activity.belongsToMany(OrderItem, {through: 'OrderItem_Activity'});
OrderItem.belongsToMany(Activity, {through: 'OrderItem_Activity'});