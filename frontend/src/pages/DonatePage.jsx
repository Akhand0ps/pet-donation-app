"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { animalAPI } from "../services/animalAPI"
import { paymentAPI } from "../services/paymentAPI"
import Loading from "../components/Loading"
import { toast } from "react-toastify"
import { validateEmail, validateAmount } from "../utils/validation"

const DonatePage = () => {
  const { animalId } = useParams()
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchAnimal()
  }, [animalId])

  const fetchAnimal = async () => {
    try {
      const data = await animalAPI.getById(animalId)
      setAnimal(data)
    } catch (error) {
      console.error("Error fetching animal:", error)
      toast.error("Failed to load animal details")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required"
    } else if (!validateAmount(formData.amount)) {
      newErrors.amount = "Please enter a valid amount (minimum ₹1)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDonate = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setProcessing(true)

    try {
      // Create Razorpay order
      const order = await paymentAPI.createOrder(Number.parseFloat(formData.amount))

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Pet Shelter",
        description: `Donation for ${animal.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorName: formData.name,
              donorEmail: formData.email,
              animalId: animalId,
              amount: Number.parseFloat(formData.amount),
            }

            await paymentAPI.verifyPayment(verificationData)

            // Navigate to success page with donation details
            navigate("/success", {
              state: {
                donorName: formData.name,
                amount: formData.amount,
                animalName: animal.name,
                paymentId: response.razorpay_payment_id,
              },
            })
          } catch (error) {
            console.error("Payment verification failed:", error)
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#ef4444",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to initiate payment")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!animal) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Animal not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Animal Details */}
        <div>
          <img
            src={animal.imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={animal.name}
            className="w-full h-64 lg:h-80 object-cover rounded-lg"
          />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{animal.name}</h1>
            <p className="text-gray-600 leading-relaxed">{animal.description}</p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Make a Donation for {animal.name}</h2>

          <form onSubmit={handleDonate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Donation Amount (₹) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="1"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter donation amount"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Processing..." : "Donate Now"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-500">
            <p>• Your donation is secure and processed through Razorpay</p>
            <p>• You will receive a confirmation email after successful payment</p>
            <p>• All donations go directly to animal care and shelter maintenance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatePage
