// <<<<<<< HEAD
import { Router } from 'express';

import { createPackage, getPackages, getFeaturedPackages, getTypes, getOn_sale } from '../controllers/PackagesController.js';

const router = Router();

// RUTAS EXCLUSIVAS PARA CARGAR LOS DATOS A LA DATABASE, SI NECESITA CARGAR LOS DATOS A SU DB LOCAL USE ESTAS RUTAS
router.get('/packages', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.post('/packages', createPackage);

//RUTAS EXCLUSIVAS PARA EL FRONT

router.get('/types', getTypes);
router.get('/on_sale', getOn_sale);

// =======


// import { Router } from 'express';
// import { createPackage, getPackages, getFeaturedPackages, getTypes, getOn_sale } from '../controllers/PackagesController.js';
// import { getPackagesDetail } from '../controllers/PackagesDetailController.js';

// const router = Router();

// //RUTAS 
// router.get('/packages/featured', getFeaturedPackages);
// router.post('/packages', createPackage);
// router.get('/packages', getPackages)
// router.get('/packages/:id', getPackagesDetail)
// router.get('/types', getTypes);
// router.get('/on_sale', getOn_sale);

// >>>>>>> origin/develop
export default router;