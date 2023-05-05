import { Router } from "express";
import { getPets } from "../petControllers/petController.js";

const router = Router();

router.get("/", getPets);

export default router;
