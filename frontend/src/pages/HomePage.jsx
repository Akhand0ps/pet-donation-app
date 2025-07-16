"use client"
import { useState, useEffect } from "react"
import { animalAPI } from "../services/animalAPI"
import AnimalCard from "../components/AnimalCard"
import Loading from "../components/Loading"
import { toast } from "react-toastify"
import { Grid, List, Filter, Search, Heart, PawPrintIcon as Paw } from "lucide-react"

const HomePage = () => {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
    
  useEffect(() => {
    fetchAnimals()
  }, [])

  useEffect(() => {
    filterAnimals()
  }, [animals, selectedFilter, searchTerm])

  const fetchAnimals = async () => {
    try {
      const data = await animalAPI.getAll()
      setAnimals(data)
    } catch (error) {
      console.error("Error fetching animals:", error)
      toast.error("Failed to load animals")
    } finally {
      setLoading(false)
    }
  }

  const filterAnimals = () => {
    let filtered = animals

    // Filter by category
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (animal) =>
          animal.type?.toLowerCase() === selectedFilter.toLowerCase() ||
          animal.category?.toLowerCase() === selectedFilter.toLowerCase(),
      )
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (animal) =>
          animal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredAnimals(filtered)
  }

  const filterOptions = [
    { value: "all", label: "All Animals", icon: "🐾" },
    { value: "dog", label: "Dogs", icon: "🐕" },
    { value: "cat", label: "Cats", icon: "🐱" },
    { value: "bird", label: "Birds", icon: "🐦" },
    { value: "rabbit", label: "Rabbits", icon: "🐰" },
    { value: "other", label: "Others", icon: "🦎" },
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 shadow-lg">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center mb-8">
            <Heart className="w-16 h-16 text-pink-300 mr-4 animate-pulse" />
            <Paw className="w-14 h-14 text-yellow-300 animate-bounce" />
            <Heart className="w-16 h-16 text-pink-300 ml-4 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in drop-shadow-lg text-center">
            Make a Difference Today
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-3xl mx-auto leading-relaxed text-center mb-8">
            Your donation brings hope and care to our shelter animals. Choose a friend below and help us change lives!
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="bg-white/30 backdrop-blur-sm rounded-full px-8 py-4 text-white font-semibold text-lg shadow-md">
              🌟 Every act of kindness counts 🌟
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-6 h-6 bg-yellow-300 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <div className="w-8 h-8 bg-pink-300 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float">
          <div className="w-5 h-5 bg-blue-300 rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search animals by name, breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-lg"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-lg"
          >
            <Filter className="w-6 h-6" />
            Filters
          </button>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-2 gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 text-lg font-medium ${
                viewMode === "grid" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Grid className="w-5 h-5" />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 text-lg font-medium ${
                viewMode === "list" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <List className="w-5 h-5" />
              List
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-down bg-white rounded-xl shadow p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 text-lg font-medium shadow-sm border ${
                    selectedFilter === option.value
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                  }`}
                >
                  <span>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="mb-8 mt-6 text-center">
          <p className="text-gray-600 text-xl font-medium">
            {filteredAnimals.length === 0 && animals.length > 0
              ? "No animals match your search criteria"
              : `Showing ${filteredAnimals.length} ${filteredAnimals.length === 1 ? "animal" : "animals"}`}
          </p>
        </div>

        {/* Animals Grid/List */}
        {animals.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-8">
              <Paw className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            </div>
            <p className="text-gray-500 text-2xl mb-4">No animals available at the moment.</p>
            <p className="text-gray-400 text-lg">Check back soon for new furry friends to help!</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-8">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            </div>
            <p className="text-gray-500 text-2xl mb-4">No animals match your search.</p>
            <p className="text-gray-400 text-lg">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div
            className={`transition-all duration-500 ease-in-out ${
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"
            }`}
            style={{ scrollBehavior: "smooth" }}
          >
            {filteredAnimals.map((animal, index) => (
              <div key={animal._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <AnimalCard
                  animal={animal}
                  viewMode={viewMode}
                  className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 animate-bounce-slow text-2xl"
        >
          <Heart className="w-7 h-7" />
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default HomePage
