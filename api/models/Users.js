import { sequelize } from '/home/sadnena/pf/proyecto-final-henry/api/db';
import { DataTypes } from 'sequelize';

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
}, 
{
	timestamps: false
});
