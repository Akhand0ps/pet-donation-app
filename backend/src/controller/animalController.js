
import { animalZod } from "../models/animal.js";
import * as adminServices from "../services/adminServices.js";

// Get all animals
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await adminServices.getAllAnimals();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch animals" });
  }
};

// Get single animal by ID
export const getAnimalById = async (req, res) => {
  try {
    const animal = await adminServices.getAnimalById(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch animal" });
  }
};

// Create new animal
export const createAnimal = async (req, res) => {
  try {
    const parsed = animalZod.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const animal = await adminServices.createAnimal(parsed.data);
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: "Failed to create animal" });
  }
};

// Update animal
export const updateAnimal = async (req, res) => {
  try {
    const parsed = animalZod.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const animal = await adminServices.updateAnimal(req.params.id, parsed.data);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: "Failed to update animal" });
  }
};

// Delete animal
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await adminServices.deleteAnimal(req.params.id);
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete animal" });
  }
};