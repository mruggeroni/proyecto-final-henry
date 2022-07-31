import { Router } from 'express';
import { 
  getFeaturedPackages, 
  getOn_sale, 
  getTypes, 
  getDeletedPackages,
  getOrderNumerPackages,
  createPackage, 
  putPackage, 
  patchPackage,
  deletePackage,
} from '../controllers/PackagesController.js';
import { getPackagesDetail } from '../controllers/PackagesDetailController.js';
import { getPackages } from '../controllers/getPackagesAllFiltersAndSortsController.js';
import { verifyAdminOrSuperAdminPermission, verifyJwt, verifySuperAdminPermission } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';

const router = Router();

//RUTAS 
router.get('/packages/detail/:id', getPackagesDetail);
router.get('/packages/orderQuantity/:id', getOrderNumerPackages);
router.get('/packages/featured', getFeaturedPackages);
router.get('/packages/:limitRender', getPackages);
router.get('/on_sale', getOn_sale);
router.get('/types', getTypes);
router.get('/deletedPackages', verifyJwt, verifyAdminOrSuperAdminPermission, getDeletedPackages);
router.post('/packages', verifyJwt, verifyAdminOrSuperAdminPermission, createPackage);
router.put('/packages/:id', verifyJwt, verifyAdminOrSuperAdminPermission, putPackage);
router.patch('/packages/:id', verifyJwt, verifyAdminOrSuperAdminPermission, patchPackage);
router.delete('/packages', verifyJwt, verifyAdminOrSuperAdminPermission, deletePackage);

export default router;
