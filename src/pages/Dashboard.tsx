import React, { useEffect } from 'react';
import { Bell, Clock, Heart, LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, refreshUserData } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await refreshUserData();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, refreshUserData]);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
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
                  {user.adoptionRequests?.map((request) => (
                    <div
                      key={request._id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={request.imageUrl}
                        alt={request.name}
                        className="h-12 w-12 rounded-full "
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(request.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                  {user.adoptionRequests?.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No adoption requests found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Adoption Requests */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
                  <Heart className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {user.adoptionRequests?.map((request) => (
                    <div
                      key={request._id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={request.imageUrl}
                        alt={request.name}
                        className="h-12 w-12 rounded-full "
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(request.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Link to={`/pets/${request.pet}`} >
                      <span className={`px-2 py-1 text-xs font-medium rounded-full hover:text-blue-700`}>
                      Visit 

                      </span></Link>
                    </div>
                  ))}
                  {user.adoptionRequests?.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No Favorites found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Section */}
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
                      <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                      <span className="flex items-center">
                        <Settings className="h-5 w-5 mr-3 text-gray-400" />
                        Account Settings
                      </span>
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
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