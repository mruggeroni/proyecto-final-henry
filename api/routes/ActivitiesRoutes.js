import { Router } from 'express';
import { getActivities, createActivity } from '../controllers/ActivitiesController.js';
import { getActivitiesData } from '../controllers/database/ActivitiesControllerData.js';
import { getDestinationData } from '../controllers/database/DestinationsControllersData.js';

const router = Router();

router.get('/activities', getActivities);
router.post('/activities', createActivity);
// RUTAS EXCLUSIVAS PARA CARGAR LOS DATOS A LA DATABASE, SI NECESITA CARGAR LOS DATOS A SU DB LOCAL USE ESTAS RUTAS
//router.get('/dbactivities', getActivitiesData);
//router.get('/dbdestinations', getDestinationData)


export default router;