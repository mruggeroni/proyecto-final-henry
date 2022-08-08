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
  LoginLocal,
  createUserLocal,
} from '../controllers/UsersController.js';
import { verifyJwt } from '../Auth/mw.js';
import { verifySuperAdminPermission, verifyAdminOrSuperAdminPermission } from '../Auth/mw.js';


const router = Router();
router.get('/user/login', LoginLocal )
router.post('user/local', createUserLocal)
router.get('/user',verifyJwt,/*  verifySuperAdminPermission ,*/ getUsers);
router.get('/deletedUsers', verifyJwt, verifySuperAdminPermission, getDeletedUsers)
router.get('/user/status/:id', getUserStatus);
router.get('/user/:id', getUserDetail);
router.post('/user', createUser)
router.put('/user',verifyJwt,  putUser) 
router.patch('/restoreUser/:id',verifyJwt, verifySuperAdminPermission, restoreUser)
router.patch('/user/:id'/* ,verifyJwt *//* ,verifySuperAdminPermission */, patchIs_adminProperty)
router.delete('/user/:id',verifyJwt, deleteUser)

export default router;