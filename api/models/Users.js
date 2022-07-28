import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';


export const User = sequelize.define('user', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
        allowNull: false,
		unique: true,
	},
	username: {
		type: DataTypes.STRING,
        allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
        allowNull: false,
		get() {
			let pass = ""; 
			for (let i = 0; i < this.password.length; i++) {
				pass += "*";
			};
			return pass;
		},
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	adress: {
		type: DataTypes.STRING,
		allowNull: true,
	},
    phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	is_admin: {
		type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
	},
	photo: {
		type: DataTypes.STRING,
        allowNull: true,
	},
}, {
	timestamps: true,
	createdAt: "created_date",
	updateAt: "update_date",
	deletedAt: "destroy_date",
	paranoid: true,
	freezeTableName: true,
});