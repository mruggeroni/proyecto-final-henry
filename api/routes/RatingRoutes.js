import { Router } from 'express';
import { verifyJwt } from '../Auth/mw.js';
import { addRating, deleteRating, getRating } from '../controllers/RatingController.js';

const router = Router();

router.post('/rating/:id', verifyJwt, addRating)
router.get('/rating/:id', verifyJwt, getRating)
router.delete('/rating/:id', verifyJwt, deleteRating)

export default router;