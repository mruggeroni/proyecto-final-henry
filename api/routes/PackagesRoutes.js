import { Router } from 'express';
import { 
  createPackage, 
  getFeaturedPackages, 
  getTypes, getOn_sale, 
  putPackage, 
  patchPackage,
  getDeletedPackages,
  deletePackage,
} from '../controllers/PackagesController.js';
import { getPackagesDetail } from '../controllers/PackagesDetailController.js';
import { getPackages } from '../controllers/getPackagesAllFiltersAndSortsController.js';

const router = Router();

//RUTAS 
router.get('/fsp/packages/:limitRender', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.get('/packages/:id', getPackagesDetail);
router.get('/on_sale', getOn_sale);
router.get('/types', getTypes);
router.get('/deletedPackages', getDeletedPackages)
router.post('/packages', createPackage);
router.put('/packages/:id', putPackage);
router.patch('/packages/:id', patchPackage);
router.delete('/packages', deletePackage);

export default router;
