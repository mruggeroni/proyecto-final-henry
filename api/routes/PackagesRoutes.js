import { Router } from "express";
import {
  createPackage,
  getPackages,
  getFeaturedPackages,
  getTypes,
  getOn_sale,
  putPackage,
} from "../controllers/PackagesController.js";
import { getPackagesDetail } from "../controllers/PackagesDetailController.js";

const router = Router();

router.get("/packages/featured", getFeaturedPackages);
router.post("/packages", createPackage);
router.put("/packages/:id", putPackage);
router.get("/packages", getPackages);
router.get("/packages/:id", getPackagesDetail);
router.get("/types", getTypes);
router.get("/on_sale", getOn_sale);

export default router;
