import 'dotenv/config';
const { DB, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } = process.env;
import Sequelize from 'sequelize';


export const sequelize = 
	process.env.NODE_ENV === 'production'
	? new Sequelize({
			database: DB,
			dialect: 'postgres',
			host: DB_HOST,
			port: 5432,
			username: DB_USER,
			password: DB_PASSWORD,
			pool: {
				max: 3,
				min: 1,
				idle: 10000,
			},
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
				keepAlive: true,
			},
			ssl: true,
		})
	: new Sequelize(
			DB,
			DB_USER,
			DB_PASSWORD,
			{
				host: DB_HOST,
				dialect: DB_DIALECT,
				logging: false,
				native: false
			},
		);
