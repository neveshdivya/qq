import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import { useAppContext } from '../../context/AppContext';
import { doctorsData } from '../../data/mockData';
import { MapPin, Heart } from 'lucide-react';

const FavoriteDoctors = () => {
  const { favoriteDoctors, toggleFavorite } = useAppContext();
  const navigate = useNavigate();

  const favDocsList = doctorsData.filter(doc => favoriteDoctors.includes(doc.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Favorite Doctors" showBack={true} />

      <div className="max-w-4xl mx-auto px-6 py-6">
        {favDocsList.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
            <p>You haven't added any doctors to your favorites list.</p>
            <button onClick={() => navigate('/doctors')} className="mt-6 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold shadow-md">
              Find Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favDocsList.map(doc => (
              <div key={doc.id} className="relative flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/doctors/${doc.id}`)}>
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{doc.name}</h4>
                  <p className="text-xs font-medium text-[var(--color-primary)] mb-1">{doc.specialty}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{doc.location}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(doc.id); }}
                  className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteDoctors;
