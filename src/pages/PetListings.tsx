import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { mockPets } from '../data/mockData';
import { Pet } from '../types';

export default function PetListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    age: '',
    location: '',
  });

  const filteredPets = mockPets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || pet.type === filters.type;
    const matchesAge = !filters.age || getAgeRange(pet.age) === filters.age;
    const matchesLocation = !filters.location || pet.location.includes(filters.location);

    return matchesSearch && matchesType && matchesAge && matchesLocation;
  });

  function getAgeRange(age: number): string {
    if (age < 1) return 'puppy';
    if (age < 3) return 'young';
    if (age < 7) return 'adult';
    return 'senior';
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search pets by name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              >
                <option value="">All Types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="rabbit">Rabbits</option>
              </select>
              <select
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              >
                <option value="">All Ages</option>
                <option value="puppy">Puppy/Kitten</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PetCard({ pet }: { pet: Pet }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-rose-600">
          {pet.status}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
          <span className="text-sm font-medium text-gray-500">{pet.age} years</span>
        </div>
        <p className="text-gray-600 font-medium mb-2">{pet.breed}</p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {pet.location}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.characteristics.map((trait, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-rose-50 text-rose-600 rounded-full text-sm"
            >
              {trait}
            </span>
          ))}
        </div>
        <Link
          to={`/pets/${pet.id}`}
          className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}