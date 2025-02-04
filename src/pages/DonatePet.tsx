import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, PawPrint, AlertCircle } from 'lucide-react';

const DonatePet = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pet Donation Data:', formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-900 mb-4 flex items-center justify-center gap-2">
          <PawPrint className="w-10 h-10 text-blue-500" /> Donate a Furry Friend
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Help us find a loving home for pets in need. Fill out the form below to donate a pet to our adoption center. Your contribution will bring joy to a future pet family!
        </p>
      </header>

      <form 
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Name */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Pet Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pet name"
            />
          </div>

          {/* Animal Type */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Animal Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an animal type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Breed */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-800 font-medium mb-2">
              Breed <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter breed"
            />
          </div>

          {/* Pet Photo */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-800 font-medium mb-2">
              Pet Photo <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <label className="cursor-pointer text-center">
                <UploadCloud className="w-10 h-10 text-blue-500 mb-3" />
                <span className="text-gray-600">
                  {formData.photo ? formData.photo.name : 'Click to upload a photo'}
                </span>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {formData.photo && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
          >
            Donate Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonatePet;