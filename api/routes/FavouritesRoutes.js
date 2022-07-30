import { Router } from 'express';
import { addFavourite } from '../controllers/FavouritesController.js';
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.post('/addFavourite/:id', verifyJwt, addFavourite)

export default router;