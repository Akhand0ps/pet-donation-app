import { Link, useLocation } from "react-router-dom"
import { CheckCircle, Heart, Home } from "lucide-react"

const SuccessPage = () => {
  const location = useLocation()
  const donationData = location.state

  if (!donationData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">No donation data found</p>
        <Link to="/" className="text-red-500 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Donation!</h1>

        <p className="text-gray-600 mb-8">
          Your generous contribution will make a real difference in the life of our animals.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h2>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Donor Name:</span>
              <span className="font-medium">{donationData.donorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Animal:</span>
              <span className="font-medium">{donationData.animalName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">₹{donationData.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium text-sm">{donationData.paymentId}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">A confirmation email has been sent to your registered email address.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 border border-red-500 text-red-500 px-6 py-3 rounded-md hover:bg-red-50 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span>Donate to Another Animal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
