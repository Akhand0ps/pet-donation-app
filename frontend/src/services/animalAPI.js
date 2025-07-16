import api from "./api"

export const animalAPI = {
  // Get all animals
  getAll: async () => {
    const response = await api.get("/animals")
    return response.data
  },

  // Get single animal
  getById: async (id) => {
    const response = await api.get(`/animals/${id}`)
    return response.data
  },

  // Create new animal
  create: async (animalData) => {
    const response = await api.post("/animals", animalData)
    return response.data
  },

  // Update animal
  update: async (id, animalData) => {
    const response = await api.put(`/animals/${id}`, animalData)
    return response.data
  },

  // Delete animal
  delete: async (id) => {
    const response = await api.delete(`/animals/${id}`)
    return response.data
  },
}
