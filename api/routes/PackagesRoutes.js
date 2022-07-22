import { Router } from 'express';

import { createPackage, getPackages, getFeaturedPackages } from '../controllers/PackagesController.js';

const router = Router();

router.get('/packages', getPackages);
router.get('/packages/featured', getFeaturedPackages);
router.post('/packages', createPackage);


// router.get('/packages', (req, res) => {
// 	res.status(200).send('<h1>Packages Route</h1>');
// });

export default router;