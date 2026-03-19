import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, User, Calendar, 
  Users, ClipboardList, LogOut 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DoctorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { doctorUser, setDoctorUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    setDoctorUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard Home', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Edit Profile', path: '/doctor/dashboard/profile', icon: User },
    { name: 'Availability Settings', path: '/doctor/dashboard/availability', icon: Calendar },
    { name: 'Upcoming Appointments', path: '/doctor/dashboard/appointments', icon: ClipboardList },
    { name: 'Patient Records', path: '/doctor/dashboard/patients', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-teal-700 text-white p-4 flex justify-between items-center z-20 shadow-md">
        <h1 className="text-xl font-bold">Doctor Portal</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-teal-600 rounded-md">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-teal-800 text-white flex flex-col shadow-lg
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-black text-teal-100 flex items-center gap-2">
            Medicare <span className="text-sm font-normal text-teal-300">Doctor</span>
          </h1>
        </div>

        <div className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // Check if exact path or subpath, but be careful with root dashboard path
            const isActive = location.pathname === link.path || (link.path !== '/doctor/dashboard' && location.pathname.startsWith(link.path));
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-teal-200 hover:bg-teal-700 hover:text-white'}
                `}
                end={link.path === '/doctor/dashboard'} // Ensure exact match for dashboard base
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-teal-700/50">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-200 hover:bg-red-500/20 hover:text-red-100 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-gray-50 overflow-y-auto h-screen relative">
        <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboardLayout;
