import api from "./api"

export const paymentAPI = {
  // Create Razorpay order
  createOrder: async (amount) => {
    const response = await api.post("/payment/orders", { amount })
    return response.data
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    const response = await api.post("/payment/verify", paymentData)
    return response.data
  },
}
