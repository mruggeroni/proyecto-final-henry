import { Router } from 'express';
import { 
  createUser,
  deleteUser,
  getDeletedUsers,
  getUsers,
  getUserDetail,
  getUserStatus,
  patchIs_adminProperty,
  putUser,
  restoreUser,
} from '../controllers/UsersController.js';
import { verifyJwt } from '../Auth/mw.js';
<<<<<<< HEAD
import { verifySuperAdminPermission } from '/home/sadnena/pf/proyecto-final-henry/api/Auth/mw.js';
=======
import { verifySuperAdminPermission, verifyAdminOrSuperAdminPermission } from '../Auth/mw.js';


>>>>>>> develop
const router = Router();

router.get('/user',verifyJwt, verifyAdminOrSuperAdminPermission , getUsers);
router.get('/deletedUsers', verifyJwt, verifyAdminOrSuperAdminPermission, getDeletedUsers)
router.get('/user/status/:id', getUserStatus);
router.get('/user/:id', getUserDetail);
<<<<<<< HEAD
router.get('/user',verifyJwt, verifySuperAdminPermission, getUsers);
router.post('/user', createUser);
=======
router.post('/user', createUser)
router.put('/user/:id', putUser)
router.patch('/restoreUser/:id',verifyJwt, verifyAdminOrSuperAdminPermission, restoreUser)
router.patch('/user/:id',verifyJwt, verifySuperAdminPermission, patchIs_adminProperty)
router.delete('/user/:id',verifyAdminOrSuperAdminPermission, deleteUser)
>>>>>>> develop

export default router;