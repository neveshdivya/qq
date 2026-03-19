import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Settings, LogOut, Heart, Bell, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile } = useAppContext();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <TopBar title="My Profile" />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 p-6 bg-teal-50 rounded-2xl">
          <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="Frank Williamson" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md" />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
            <p className="text-gray-500 mb-2">{userProfile.email}</p>
            <p className="text-sm font-semibold text-[var(--color-primary)]">{userProfile.phone}</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="space-y-4">
          <button onClick={() => navigate('/profile/personal-data')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full"><UserIcon className="w-5 h-5" /></div>
              <span className="font-semibold text-gray-800">Personal Data</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          
          <button onClick={() => navigate('/profile/favorites')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-full"><Heart className="w-5 h-5" /></div>
              <span className="font-semibold text-gray-800">Favorite Doctors</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button onClick={() => navigate('/profile/notifications')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 text-yellow-500 rounded-full"><Bell className="w-5 h-5" /></div>
              <span className="font-semibold text-gray-800">Notifications</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button onClick={() => navigate('/profile/settings')} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 text-gray-500 rounded-full"><Settings className="w-5 h-5" /></div>
              <span className="font-semibold text-gray-800">Settings</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl hover:shadow-md transition-shadow mt-8">
            <div className="flex items-center gap-4">
              <div className="p-3 text-red-500"><LogOut className="w-5 h-5" /></div>
              <span className="font-bold text-red-600">Logout</span>
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
