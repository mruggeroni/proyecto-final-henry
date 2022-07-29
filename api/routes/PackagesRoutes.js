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
router.get('/packages/detail/:id', getPackagesDetail);
router.get('/packages/featured', getFeaturedPackages);
router.get('/packages/:limitRender', getPackages);
router.get('/on_sale', getOn_sale);
router.get('/types', getTypes);
router.get('/deletedPackages', getDeletedPackages)
router.get('/packages', getPackages)
router.post('/packages', createPackage);
router.put('/packages/:id', putPackage);
router.patch('/packages/:id', patchPackage);
router.delete('/packages', deletePackage);

export default router;
