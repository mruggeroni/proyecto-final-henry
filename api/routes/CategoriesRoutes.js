import { Router } from 'express';
import { createClassification, getCategories } from '../controllers/CategoriesController.js';
//import { getCategoriesData } from '../controllers/database/ClassificationControllerData.js';

const router = Router();

router.get('/categories', getCategories);
router.post('/classification', createClassification);
// RUTAS EXCLUSIVAS PARA CARGAR LOS DATOS A LA DATABASE, SI NECESITA CARGAR LOS DATOS A SU DB LOCAL USE ESTAS RUTAS
//router.get('/classifications', getCategoriesData)


export default router;