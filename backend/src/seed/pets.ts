import Pet from '../models/Pet';

const mockPets = [
  // Your existing pets
  {
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 2,
    location: 'San Francisco, CA',
    description: 'Friendly and energetic Golden Retriever who loves to play fetch.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    status: 'available',
    health: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
    },
    characteristics: ['Friendly', 'Energetic', 'Good with kids']
  },
  // Add 20 more pets (shortened example - create similar entries)
  {
    name: 'Max',
    type: 'dog',
    breed: 'Labrador Retriever',
    age: 3,
    location: 'Austin, TX',
    description: 'Gentle giant who loves swimming and long walks.',
    imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
    status: 'available',
    health: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
    },
    characteristics: ['Gentle', 'Loyal', 'Good with other dogs']
  },
  {
    name: 'Bella',
    type: 'cat',
    breed: 'Siamese',
    age: 1,
    location: 'Miami, FL',
    description: 'Playful and vocal cat that loves attention.',
    imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
    status: 'available',
    health: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
    },
    characteristics: ['Playful', 'Vocal', 'Curious']
  },
  // Continue adding 18 more entries following the same pattern
  // You can use different breeds, ages, and characteristics
  // Suggested breeds: German Shepherd, Persian, Beagle, Maine Coon, etc.
];

export const seedPets = async () => {
  try {
    await Pet.deleteMany({});
    await Pet.insertMany(mockPets);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};