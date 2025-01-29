// import React from 'react';
// import { motion } from 'framer-motion';
// import { Heart, Clock, Settings, Bell, User, LogOut } from 'lucide-react';
// import { useAuthStore } from '../store/authStore';
// import { mockPets } from '../data/mockData';

// export default function Dashboard() {
//   const { user } = useAuthStore();

//   const adoptionRequests = [
//     {
//       id: '1',
//       pet: mockPets[0],
//       status: 'pending',
//       date: '2024-02-28',
//     },
//     {
//       id: '2',
//       pet: mockPets[1],
//       status: 'approved',
//       date: '2024-02-25',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Welcome Section */}
//         <div className="px-4 py-6 sm:px-0">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-lg shadow-sm p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
//                 <p className="mt-1 text-sm text-gray-500">Manage your adoption requests and favorites</p>
//               </div>
//               <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
//                 <Bell className="h-6 w-6" />
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Dashboard Grid */}
//         <div className="mt-6 px-4 sm:px-0">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {/* Adoption Requests */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-lg shadow-sm overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold text-gray-900">Adoption Requests</h2>
//                   <Clock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <div className="space-y-4">
//                   {adoptionRequests.map((request) => (
//                     <div
//                       key={request.id}
//                       className="flex items-center p-4 bg-gray-50 rounded-lg"
//                     >
//                       <img
//                         src={request.pet.imageUrl}
//                         alt={request.pet.name}
//                         className="h-12 w-12 rounded-full object-cover"
//                       />
//                       <div className="ml-4 flex-1">
//                         <h3 className="text-sm font-medium text-gray-900">{request.pet.name}</h3>
//                         <p className="text-sm text-gray-500">{request.date}</p>
//                       </div>
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                         request.status === 'approved'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {request.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Favorites */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-lg shadow-sm overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
//                   <Heart className="h-5 w-5 text-rose-500" />
//                 </div>
//                 <div className="space-y-4">
//                   {mockPets.slice(0, 3).map((pet) => (
//                     <div
//                       key={pet.id}
//                       className="flex items-center p-4 bg-gray-50 rounded-lg"
//                     >
//                       <img
//                         src={pet.imageUrl}
//                         alt={pet.name}
//                         className="h-12 w-12 rounded-full object-cover"
//                       />
//                       <div className="ml-4">
//                         <h3 className="text-sm font-medium text-gray-900">{pet.name}</h3>
//                         <p className="text-sm text-gray-500">{pet.breed}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Profile */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }} <boltAction type="file" filePath="src/pages/Dashboard.tsx">              animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
//                       <User className="h-6 w-6 text-rose-600" />
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
//                       <p className="text-sm text-gray-500">{user?.email}</p>
//                     </div>
//                   </div>
//                   <div className="pt-4 space-y-2">
//                     <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
//                       <span className="flex items-center">
//                         <Settings className="h-5 w-5 mr-3 text-gray-400" />
//                         Account Settings
//                       </span>
//                     </button>
//                     <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
//                       <span className="flex items-center">
//                         <LogOut className="h-5 w-5 mr-3" />
//                         Sign Out
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { Bell, Clock, Heart, LogOut, Settings, User } from 'lucide-react';

// Remove framer-motion since it's not in the available libraries
const Dashboard = () => {
  // Mock user and data since stores aren't available
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };

  const mockPets = [
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      imageUrl: '/api/placeholder/48/48'
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Siamese Cat',
      imageUrl: '/api/placeholder/48/48'
    },
    {
      id: '3',
      name: 'Rocky',
      breed: 'German Shepherd',
      imageUrl: '/api/placeholder/48/48'
    }
  ];

  const adoptionRequests = [
    {
      id: '1',
      pet: mockPets[0],
      status: 'pending',
      date: '2024-02-28',
    },
    {
      id: '2',
      pet: mockPets[1],
      status: 'approved',
      date: '2024-02-25',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your adoption requests and favorites</p>
              </div>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="mt-6 px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Adoption Requests */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Adoption Requests</h2>
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {adoptionRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={request.pet.imageUrl}
                        alt={request.pet.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{request.pet.name}</h3>
                        <p className="text-sm text-gray-500">{request.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
                  <Heart className="h-5 w-5 text-rose-500" />
                </div>
                <div className="space-y-4">
                  {mockPets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{pet.name}</h3>
                        <p className="text-sm text-gray-500">{pet.breed}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-rose-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                      <span className="flex items-center">
                        <Settings className="h-5 w-5 mr-3 text-gray-400" />
                        Account Settings
                      </span>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                      <span className="flex items-center">
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;