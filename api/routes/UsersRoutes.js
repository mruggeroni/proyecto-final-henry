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
import { verifySuperAdminPermission, verifyAdminOrSuperAdminPermission } from '../Auth/mw.js';


const router = Router();

router.get('/user',verifyJwt, verifySuperAdminPermission , getUsers);
router.get('/deletedUsers', verifyJwt, verifySuperAdminPermission, getDeletedUsers)
router.get('/user/status/:id', getUserStatus);
router.get('/user/:id', getUserDetail);
router.post('/user', createUser)
router.put('/user/:id',  putUser)
router.patch('/restoreUser/:id', restoreUser)
router.patch('/user/:id', patchIs_adminProperty)
router.delete('/user/:id',verifyJwt,verifySuperAdminPermission, deleteUser)

export default router;