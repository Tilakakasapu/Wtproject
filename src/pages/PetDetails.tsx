import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Check, AlertCircle } from 'lucide-react';
import { mockPets } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const pet = mockPets.find(p => p.id === id);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Pet not found</h2>
          <p className="mt-1 text-sm text-gray-500">The pet you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAdoptClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Handle adoption process
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pet Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-96 lg:h-full"
            >
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Pet Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                  <p className="text-lg text-gray-600">{pet.breed}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                  {pet.status}
                </span>
              </div>

              <div className="flex items-center text-gray-500 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                {pet.location}
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-600">{pet.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Health</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Vaccinated
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Neutered
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Microchipped
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Characteristics</h2>
                  <div className="flex flex-wrap gap-2">
                    {pet.characteristics.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleAdoptClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Adoption Process
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}