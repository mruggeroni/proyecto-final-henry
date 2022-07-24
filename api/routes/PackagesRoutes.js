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

export default router;