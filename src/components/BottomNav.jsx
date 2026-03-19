import React from 'react';
import { Home, User, UserCheck, Grid, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/home' },
    { icon: <UserCheck className="w-6 h-6" />, label: 'Doctors', path: '/doctors' },
    { icon: null, label: '', path: '/booking' }, // Placeholder for center button
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
    { icon: <Grid className="w-6 h-6" />, label: 'Categories', path: '/categories' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 pt-2 flex justify-between items-center relative">
        {navItems.map((item, index) => {
          if (index === 2) {
            // Center floating button
            return (
              <div key="center-btn" className="relative -top-8">
                <button 
                  onClick={() => navigate('/booking')}
                  className="bg-[var(--color-primary)] text-white p-4 md:p-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-4 border-white"
                >
                  <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            );
          }

        const isActive = location.pathname.startsWith(item.path);
        
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 min-w-[64px] ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {item.icon}
            <span className="text-xs font-medium pt-1 pb-1">{item.label}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
};

export default BottomNav;
