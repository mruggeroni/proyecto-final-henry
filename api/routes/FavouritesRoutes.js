import { Router } from 'express';
import { addFavourite, deleteFavourite, getFavourites } from '../controllers/FavouritesController.js';
import { verifyJwt } from '../Auth/mw.js';

const router = Router();

router.post('/favourites/:id', verifyJwt, addFavourite)
router.get('/favourites', verifyJwt, getFavourites)
router.delete('/favourites/:id', verifyJwt, deleteFavourite)

export default router;