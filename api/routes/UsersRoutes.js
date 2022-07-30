import { Router } from 'express';
import { 
  createUser,
  deleteUser,
  getDeletedUsers,
  getUsers,
  patchIs_adminProperty,
  putUser,
  restoreUser,
} from '../controllers/UsersController.js';
import { verifyJwt } from '../Auth/mw.js';
import { verifySuperAdminPermission, verifyAdminOrSuperAdminPermission } from '../Auth/mw.js';


const router = Router();

router.get('/user',verifyJwt, verifyAdminOrSuperAdminPermission , getUsers);
router.get('/deletedUsers', verifyJwt, verifyAdminOrSuperAdminPermission, getDeletedUsers)
router.post('/user', createUser)
router.put('/user/:id', putUser)
router.patch('/restoreUser/:id',verifyJwt, verifyAdminOrSuperAdminPermission, restoreUser)
router.patch('/user/:id',verifyJwt, verifySuperAdminPermission, patchIs_adminProperty)
router.delete('/user/:id',verifyAdminOrSuperAdminPermission, deleteUser)

export default router;