"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { animalAPI } from "../../services/animalAPI"
import ConfirmDialog from "../../components/ConfirmDialog"
import Loading from "../../components/Loading"
import { toast } from "react-toastify"
import { Plus, Edit, Trash2, Search, Grid, List, Heart, Moon, Sun } from "lucide-react"

const AnimalsList = () => {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    animalId: null,
    animalName: "",
  })

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    fetchAnimals()
  }, [])

  useEffect(() => {
    filterAnimals()
  }, [animals, searchTerm])

  const fetchAnimals = async () => {
    try {
      const data = await animalAPI.getAll()
      setAnimals(data)
    } catch (err) {
      console.log("Error fetching animals:", err)
      toast.error("Failed to load animals")
    } finally {
      setLoading(false)
    }
  }

  const filterAnimals = () => {
    let filtered = animals
    if (searchTerm) {
      filtered = filtered.filter(
        (animal) =>
          animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredAnimals(filtered)
  }

  const handleDeleteClick = (animal) => {
    setDeleteDialog({
      isOpen: true,
      animalId: animal._id,
      animalName: animal.name,
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      await animalAPI.delete(deleteDialog.animalId)
      setAnimals(animals.filter((animal) => animal._id !== deleteDialog.animalId))
      toast.success("Animal deleted successfully")
    } catch (err) {
      console.error("Error deleting animal: ", err)
      toast.error("Failed to delete animal")
    } finally {
      setDeleteDialog({ isOpen: false, animalId: null, animalName: "" })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, animalId: null, animalName: "" })
  }

  const AnimalCard = ({ animal }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:scale-105 overflow-hidden">
      <div className="relative">
        <img
          src={animal.imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <Heart className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{animal.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{animal.description}</p>
        <div className="flex space-x-3">
          <Link
            to={`/admin/animals/edit/${animal._id}`}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
          <button
            onClick={() => handleDeleteClick(animal)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Animals Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all furry friends in the shelter</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:scale-105"
            >
              {darkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-600" />}
            </button>

            <Link
              to="/admin/animals/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Animal</span>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search animals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Showing {filteredAnimals.length} {filteredAnimals.length === 1 ? "animal" : "animals"}
          </p>
        </div>

        {/* Animals Display */}
        {animals.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">No animals found</p>
            <Link
              to="/admin/animals/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>Add First Animal</span>
            </Link>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <p className="text-gray-500 dark:text-gray-400 text-xl">No animals match your search</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimals.map((animal, index) => (
              <div key={animal._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimalCard animal={animal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Animal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAnimals.map((animal) => (
                    <tr key={animal._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={animal.imageUrl || "/placeholder.svg?height=50&width=50"}
                            alt={animal.name}
                            className="h-12 w-12 rounded-full object-cover shadow-md"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{animal.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-gray-300 max-w-xs truncate">
                          {animal.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link
                            to={`/admin/animals/edit/${animal._id}`}
                            className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(animal)}
                            className="inline-flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Animal"
          message={`Are you sure you want to delete "${deleteDialog.animalName}"? This action cannot be undone.`}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default AnimalsList
