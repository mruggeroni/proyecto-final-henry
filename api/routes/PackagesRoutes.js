import { Router } from 'express';
import { createPackage, getFeaturedPackages, getTypes, getOn_sale, putPackage, patchPackage } from '../controllers/PackagesController.js';
import { getPackagesDetail } from '../controllers/PackagesDetailController.js';
import { getPackages } from '../controllers/getPackagesAllFiltersAndSortsController.js';

const router = Router();

//RUTAS 

router.get('/fsp/packages/:limitRender', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.get('/packages/:id', getPackagesDetail);
router.get('/on_sale', getOn_sale);
router.get('/types', getTypes);
router.post('/packages', createPackage);
router.put('/packages/:id', putPackage);
router.patch('/packages/:id', patchPackage);


export default router;
