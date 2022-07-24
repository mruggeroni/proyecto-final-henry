<<<<<<< HEAD
import { Router } from 'express';

import { createPackage, getPackages, getFeaturedPackages } from '../controllers/PackagesController.js';
import { getPackageData } from '../controllers/database/PackagesControllersData.js';

const router = Router();

router.get('/packages', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.post('/packages', createPackage);
// RUTAS EXCLUSIVAS PARA CARGAR LOS DATOS A LA DATABASE, SI NECESITA CARGAR LOS DATOS A SU DB LOCAL USE ESTAS RUTAS
//router.get('/dbpackages', getPackageData)
//


// router.get('/packages', (req, res) => {
// 	res.status(200).send('<h1>Packages Route</h1>');
// });

=======
import { Router } from 'express';

import { createPackage, getPackages, getFeaturedPackages, getTypes } from '../controllers/PackagesController.js';

const router = Router();

router.get('/types', getTypes);
router.get('/packages', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.post('/packages', createPackage);


// router.get('/packages', (req, res) => {
// 	res.status(200).send('<h1>Packages Route</h1>');
// });

>>>>>>> Gaby
export default router;