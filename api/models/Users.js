<<<<<<< HEAD
import { sequelize } from '/home/sadnena/pf/proyecto-final-henry/api/db';
import { DataTypes } from 'sequelize';
=======
import { DataTypes, STRING } from 'sequelize';
import { sequelize } from '../db.js';
>>>>>>> b49a6bf60c3dd01cae7b33fa75563d8567da88dc

export const User = sequelize.define('user', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	full_name: {
		type: DataTypes.VIRTUAL,
		get() {
			return `${this.first_name} ${this.last_name}`;
		},
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
<<<<<<< HEAD
	// country: {
	// 	type: DataTypes.STRING,
	// 	allowNull: true,
	// },
	// city: {
	// 	type: DataTypes.STRING,
	// 	allowNull: true,
	// },
    adress: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
    phone: {
=======
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address_line1: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address_line2: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	postal_code: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
>>>>>>> b49a6bf60c3dd01cae7b33fa75563d8567da88dc
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
<<<<<<< HEAD
}, 
{
	timestamps: false
=======
}, {
	timestamps: true,
  createdAt: "created_date",
  updatedAt: "update_date",
	paranoid:true,
	deletedAt: 'destroyTime',
>>>>>>> b49a6bf60c3dd01cae7b33fa75563d8567da88dc
});
