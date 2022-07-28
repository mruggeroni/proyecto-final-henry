
import { Router } from 'express';

import { createClassification, getClassification, putClassification } from '../controllers/CategoriesController.js';
//import { getCategoriesData } from '../controllers/database/ClassificationControllerData.js';

const router = Router();

router.get('/classification', getClassification);
router.post('/classification', createClassification);
router.put('/classification/:id', putClassification)
// RUTAS EXCLUSIVAS PARA CARGAR LOS DATOS A LA DATABASE, SI NECESITA CARGAR LOS DATOS A SU DB LOCAL USE ESTAS RUTAS
//router.get('/classifications', getCategoriesData)

export default router;