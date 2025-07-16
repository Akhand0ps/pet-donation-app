import express from "express";
import * as animalController from "../controller/animalController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();


router.get("/", animalController.getAllAnimals);
router.get("/:id", animalController.getAnimalById);


router.post("/", adminAuth, animalController.createAnimal);
router.put("/:id", adminAuth, animalController.updateAnimal);
router.delete("/:id", adminAuth, animalController.deleteAnimal);

export default router; 