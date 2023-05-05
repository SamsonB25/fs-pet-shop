import { Router } from "express";
import {
  getPets,
  getPet,
  addPet,
  deletePet,
  updatePet,
} from "../petControllers/petController.js";

const router = Router();

router.get("/", getPets).post("/", addPet);
router.get("/:id", getPet).delete("/:id", deletePet).patch("/:id", updatePet);

export default router;
