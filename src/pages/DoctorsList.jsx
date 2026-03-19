import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { doctorsData } from '../data/mockData';

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState(initialCategory);

  // Update search term when query param changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSearchTerm(searchParams.get('category'));
    }
  }, [searchParams]);

  const filteredDoctors = doctorsData.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <TopBar 
        title="All Doctors" 
        showBack={true} 
      />

      <div className="px-6 py-4">
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search specific doctor or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <button className="p-3 bg-[var(--color-primary)] text-white rounded-xl shadow-md hover:bg-teal-700">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? filteredDoctors.map(doc => (
            <div key={doc.id} onClick={() => navigate(`/doctors/${doc.id}`)} className="flex flex-col p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{doc.name}</h4>
                  <p className="text-sm font-medium text-[var(--color-primary)] mb-1">{doc.specialty}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <span className="text-yellow-400">⭐</span>
                    <span>{doc.rating}</span>
                    <span className="text-gray-400 font-normal">({doc.reviews} Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{doc.location}</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Consultation Fee</span>
                  <span className="font-bold text-gray-900 text-lg">{doc.fees}</span>
                </div>
                <button className="bg-teal-50 text-[var(--color-primary)] px-5 py-2 rounded-lg text-sm font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No doctors found matching "{searchTerm}". Try a different name or category.
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorsList;
