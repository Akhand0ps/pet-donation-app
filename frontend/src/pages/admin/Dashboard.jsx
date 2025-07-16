
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { animalAPI } from "../../services/animalAPI"
import { donationAPI } from "../../services/donationAPI"
import { Heart, Users, DollarSign, PlusCircle } from "lucide-react"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAnimals: 0,
    totalDonations: 0,
    totalAmount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [animals, donations] = await Promise.all([
        animalAPI.getAll(),
        donationAPI.getAll(),
      ])
      const totalAmount = donations.reduce(
        (sum, donation) => sum + (Number(donation.amount) || 0),
        0
      )
      setStats({
        totalAnimals: animals.length,
        totalDonations: donations.length,
        totalAmount,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border-b-4 ${color}`}>
      <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
        <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage your pet shelter operations</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin/animals/new"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold text-base"
            >
              <PlusCircle className="h-5 w-5" />
              Add New Animal
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard
            icon={Heart}
            title="Total Animals"
            value={stats.totalAnimals}
            color="bg-blue-500"
          />
          <StatCard
            icon={Users}
            title="Total Donations"
            value={stats.totalDonations}
            color="bg-green-500"
          />
          <StatCard
            icon={DollarSign}
            title="Total Amount"
            value={`₹${stats.totalAmount.toLocaleString()}`}
            color="bg-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/admin/animals"
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors"
            >
              <Heart className="h-5 w-5" />
              Manage Animals
            </Link>
            <Link
              to="/admin/donations"
              className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              View Donations
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-3 rounded-lg font-medium hover:bg-purple-200 transition-colors"
            >
              <Users className="h-5 w-5" />
              View Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard