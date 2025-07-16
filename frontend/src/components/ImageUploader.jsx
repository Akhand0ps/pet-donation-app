// components/ImageUploader.jsx
import React from "react"
import { Upload, X } from "lucide-react"
import { toast } from "react-toastify"

const ImageUploader = ({ imagePreview, setImagePreview, imageFile, setImageFile }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setImageFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Animal Image</label>

      {imagePreview ? (
        <div className="relative inline-block">
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">Click to upload an image</p>
          <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
      />
    </div>
  )
}

export default ImageUploader
