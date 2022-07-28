import app from "./app.js";
import { getActivitiesData } from "./controllers/database/ActivitiesControllerData.js";
import { getClassificationData } from "./controllers/database/ClassificationControllerData.js";
import { getDestinationData } from "./controllers/database/DestinationsControllersData.js";
import { getPackageData } from "./controllers/database/PackagesControllersData.js";
import { sequelize } from "./db.js";
const PORT = process.env.PORT || 3001;

async function main() {
	try {
		// await sequelize.sync({ force: false })
		await sequelize.sync({ force: false });
		console.log('Connection has been established successfully.');
		app.listen(PORT, () => {
			console.log('Server listening on http://localhost:3001');
		});
		await getClassificationData();
		await getActivitiesData();
		await getDestinationData();
		await getPackageData();
		console.log('Server is Ok');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	};
};

main();
