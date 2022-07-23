import 'dotenv/config';
const { DB, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } = process.env;
import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
	DB,
	DB_USER,
	DB_PASSWORD,
	{
		host: DB_HOST,
		port: DB_PORT,
		dialect: DB_DIALECT,
		logging: false,
	}
);