
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Heart, User, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900">aidforpaws</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAdminRoute && (
              <Link to="/" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
            )}

            {isAdminRoute && isAuthenticated && (
              <>
                <Link to="/admin" className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link
                  to="/admin/animals"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Animals
                </Link>
                <Link
                  to="/admin/donations"
                  className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Donations
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAdminRoute && (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg">
          {!isAdminRoute && (
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          )}

          {isAdminRoute && isAuthenticated && (
            <>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/animals"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Animals
              </Link>
              <Link
                to="/admin/donations"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
                onClick={closeMobileMenu}
              >
                Donations
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </div>
              </button>
            </>
          )}

          {!isAdminRoute && (
            <Link
              to="/admin/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Admin Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
