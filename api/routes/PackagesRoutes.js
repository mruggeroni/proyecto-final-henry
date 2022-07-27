import { Router } from 'express';
import { createPackage, /* getPackages, */ getFeaturedPackages, getTypes, getOn_sale, patchPackage } from '../controllers/PackagesController.js';
import { getPackagesDetail } from '../controllers/PackagesDetailController.js';
import { getPackages } from '../controllers/getPackagesAllFiltersAndSortsController.js';

const router = Router();

//RUTAS 
router.get('/fsp/packages/:limitRender', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.post('/packages', createPackage);
// router.get('/packages', getPackages)
router.get('/packages/:id', getPackagesDetail)
router.get('/types', getTypes);
router.get('/on_sale', getOn_sale);
router.patch('/patch/package/:id', patchPackage);

export default router;