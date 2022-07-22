import app from './app.js';
import { sequelize } from './db.js';

async function main() {
	try {
		// await sequelize.sync({ force: false })
		await sequelize.sync({ alter: true })
		console.log('Connection has been established successfully.');
		app.listen(3001, () => {
			console.log('Server listening on http://localhost:3001');
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

main();