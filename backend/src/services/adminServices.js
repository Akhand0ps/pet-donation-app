import Animal from "../models/animal.js";

// Create animal
export const createAnimal = async (data) => {
  return await Animal.create(data);
};

// Get all animals
export const getAllAnimals = async () => {
  return await Animal.find();
};

// Get animal by ID
export const getAnimalById = async (id) => {
  return await Animal.findById(id);
};

// Update animal
export const updateAnimal = async (id, data) => {
  return await Animal.findByIdAndUpdate(id, data, { new: true });
};

// Delete animal
export const deleteAnimal = async (id) => {
  return await Animal.findByIdAndDelete(id);
};



