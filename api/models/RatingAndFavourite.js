import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const RatingAndFavourite = sequelize.define('ratingAndFavourite', {
	rating: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	favourite: {
		type: DataTypes.BOOLEAN,
		allowNull: true	
	}
}, {
	timestamps: false,
});