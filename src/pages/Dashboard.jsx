import React from 'react';
import { Search, SlidersHorizontal, ArrowRight, Brain, Heart, Bone, Microscope, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { doctorsData } from '../data/mockData';

const categories = [
  { name: 'Neurology', icon: <Brain />, color: 'bg-pink-50' },
  { name: 'Cardiology', icon: <Heart />, color: 'bg-red-50' },
  { name: 'Orthopedics', icon: <Bone />, color: 'bg-orange-50' },
  { name: 'Pathology', icon: <Microscope />, color: 'bg-blue-50' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // Show top 8 highest rated doctors on dashboard
  const popularDoctors = [...doctorsData].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 8);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Profile */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="User" className="w-16 h-16 rounded-full border-4 border-teal-50 object-cover shadow-sm" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Welcome Back</p>
              <h2 className="text-2xl font-bold text-gray-900">Frank Williamson</h2>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 shadow-sm transition-all">
              <Search className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 shadow-sm transition-all">
              <SlidersHorizontal className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile & Desktop Banner Layout */}
        <div className="px-6 mb-10 cursor-pointer" onClick={() => navigate('/doctors')}>
          <div className="bg-[var(--color-primary)] rounded-3xl p-8 md:p-12 relative overflow-hidden flex items-center justify-between shadow-xl">
            <div className="z-10 relative">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">Looking for<br />Doctor ?</h2>
              <button className="bg-white text-[var(--color-primary)] font-bold py-3 px-8 rounded-xl shadow-md hover:bg-teal-50 transition-colors text-lg">
                Search
              </button>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-end justify-end overflow-hidden z-0">
               <div className="bg-teal-700/30 rounded-full w-48 h-48 md:w-96 md:h-96 absolute -right-10 -bottom-10 mix-blend-multiply"></div>
               <img src="https://images.unsplash.com/photo-1612349317150-e410f624c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Doctor" className="h-[120%] md:h-[150%] object-cover object-top translate-y-4 right-0" />
            </div>
          </div>
        </div>

        {/* Categories Horizontal */}
        <div className="mb-10">
          <div className="flex justify-between items-center px-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Find Your Doctor</h3>
            <button onClick={() => navigate('/categories')} className="text-[var(--color-primary)] font-bold hover:underline bg-teal-50 px-4 py-2 rounded-lg">See All</button>
          </div>
          <div className="flex overflow-x-auto px-6 gap-6 no-scrollbar pb-4 -mx-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 shrink-0 px-2" onClick={() => navigate('/categories')}>
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl ${cat.color} flex items-center justify-center cursor-pointer shadow-sm hover:shadow-lg transition-all`}>
                  {React.cloneElement(cat.icon, { className: 'w-10 h-10 md:w-14 md:h-14 stroke-current color-inherit opacity-90' })}
                </div>
                <span className="text-base font-semibold text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Doctors List */}
        <div className="px-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Popular Doctors</h3>
            <button onClick={() => navigate('/doctors')} className="text-[var(--color-primary)] font-bold hover:underline bg-teal-50 px-4 py-2 rounded-lg">See All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {popularDoctors.map(doc => (
              <div key={doc.id} onClick={() => navigate(`/doctors/${doc.id}`)} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl cursor-pointer transition-all">
                <div className="flex items-center gap-5">
                  <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h4>
                    <p className="text-sm font-medium text-[var(--color-primary)] mb-2">{doc.specialty}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <span className="text-yellow-400">⭐</span>
                      <span>{doc.rating}</span>
                      <span className="text-gray-400 font-normal">({doc.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4 border-l border-gray-100 pl-4">
                  <p className="text-sm font-bold text-gray-500">Fees <span className="text-xl text-[var(--color-primary)]">{doc.fees}</span></p>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/booking`); }} className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-700 shadow-md transition-colors w-full">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
