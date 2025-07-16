
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Loading from "./Loading"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
