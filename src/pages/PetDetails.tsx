import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, toggleFavorite, submitAdoption } = useAuthStore();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pets/${id}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
        
        const data = await response.json();
        setPet(data);
        setIsFavorite(user?.favorites?.includes(data._id) || false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pet');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPet();
  }, [id, user]);

  const handleAdoptClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      setIsAdopting(true);
      await submitAdoption(pet._id);
      // Refresh pet status
      const response = await fetch(`http://localhost:5000/api/pets/${pet._id}`);
      const updatedPet = await response.json();
      setPet(updatedPet);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Adoption request failed');
    } finally {
      setIsAdopting(false);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Error loading pet</h2>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

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
              <button
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors"
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'text-rose-600 fill-current' : 'text-gray-400'}`} />
              </button>
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
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  pet.status === 'available' ? 'bg-green-100 text-green-800' :
                  pet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
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
                      <Check className={`h-5 w-5 ${pet.health.vaccinated ? 'text-green-500' : 'text-gray-400'} mr-2`} />
                      Vaccinated
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className={`h-5 w-5 ${pet.health.neutered ? 'text-green-500' : 'text-gray-400'} mr-2`} />
                      Neutered
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className={`h-5 w-5 ${pet.health.microchipped ? 'text-green-500' : 'text-gray-400'} mr-2`} />
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

                <div className="pt-6 space-y-4">
                <button
  onClick={handleAdoptClick}
  disabled={pet.status !== 'available' || isAdopting}
  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 disabled:cursor-not-allowed md:py-4 md:text-lg md:px-10"
>
  {isAdopting ? (
    <span className="flex items-center">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        {/* Loading spinner SVG */}
      </svg>
      Processing...
    </span>
  ) : (
    pet.status === 'available' ? 'Start Adoption Process' : 'Adoption Not Available'
  )}
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