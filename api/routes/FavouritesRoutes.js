import { Router } from 'express';
import { addFavourite, getFavourites } from '../controllers/FavouritesController.js';
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.post('/addFavourite/:id', verifyJwt, addFavourite)
router.get('/favourites', verifyJwt, getFavourites)

export default router;