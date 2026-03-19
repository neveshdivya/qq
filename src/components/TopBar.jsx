import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ title, showBack = true, rightAction = null }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-50">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        )}
        {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
      </div>
      <div>
        {rightAction}
      </div>
    </div>
  );
};

export default TopBar;
