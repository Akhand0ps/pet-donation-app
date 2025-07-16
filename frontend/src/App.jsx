import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import DonatePage from "./pages/DonatePage"
import SuccessPage from "./pages/SuccessPage"
import AdminLogin from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AnimalsList from "./pages/admin/AnimalsList"
import AnimalForm from "./pages/admin/AnimalForm"
import DonationsList from "./pages/admin/DonationsList"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/donate/:animalId" element={<DonatePage />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/animals"
          element={
            <ProtectedRoute>
              <AnimalsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/animals/new"
          element={
            <ProtectedRoute>
              <AnimalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/animals/edit/:id"
          element={
            <ProtectedRoute>
              <AnimalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute>
              <DonationsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
