import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import DoctorProfile from './pages/DoctorProfile';
import DoctorsList from './pages/DoctorsList';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import { useAppContext } from './context/AppContext';

// Profile Subpages
import PersonalData from './pages/profile/PersonalData';
import FavoriteDoctors from './pages/profile/FavoriteDoctors';
import NotificationsPage from './pages/profile/Notifications';
import SettingsPage from './pages/profile/Settings';

// Doctor Portal Pages
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDashboardLayout from './pages/doctor/DoctorDashboardLayout';
import DashboardHome from './pages/doctor/DashboardHome';
import EditDetails from './pages/doctor/EditDetails';
import AvailabilitySettings from './pages/doctor/AvailabilitySettings';
import UpcomingAppointments from './pages/doctor/UpcomingAppointments';
import PatientRecords from './pages/doctor/PatientRecords';

function App() {
  const { settings } = useAppContext();

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <div className={`min-h-screen relative transition-colors ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-7xl mx-auto min-h-screen shadow-xl relative overflow-x-hidden ${settings.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/booking" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal-data" element={<PersonalData />} />
          <Route path="/profile/favorites" element={<FavoriteDoctors />} />
          <Route path="/profile/notifications" element={<NotificationsPage />} />
          <Route path="/profile/settings" element={<SettingsPage />} />

          {/* Doctor Portal Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<EditDetails />} />
            <Route path="availability" element={<AvailabilitySettings />} />
            <Route path="appointments" element={<UpcomingAppointments />} />
            <Route path="patients" element={<PatientRecords />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
