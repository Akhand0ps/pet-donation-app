
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Heart, User, LogOut } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const isAdminRoute = location.pathname.startsWith("/admin")

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900">Pet Shelter</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAdminRoute && (
              <Link to="/" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
            )}

            {isAdminRoute && isAuthenticated && (
              <>
                <Link to="/admin" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link
                  to="/admin/animals"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Animals
                </Link>
                <Link
                  to="/admin/donations"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Donations
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAdminRoute && (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
