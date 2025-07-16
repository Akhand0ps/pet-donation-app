import api from "./api"

export const donationAPI = {
  // Get all donations
  getAll: async () => {
    const response = await api.get("/donations")
    return response.data
  },

  // Create donation record
  create: async (donationData) => {
    const response = await api.post("/donations", donationData)
    return response.data
  },
}
