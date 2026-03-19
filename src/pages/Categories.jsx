import React from 'react';
import TopBar from '../components/TopBar';
import { Search, Stethoscope, Baby, Eye, Activity, Brain, Microscope, User, Heart, Syringe, Bone, ActivitySquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'General Physician', icon: <User className="w-8 h-8 text-orange-500" />, bg: 'bg-orange-50' },
  { name: 'Nephrology', icon: <ActivitySquare className="w-8 h-8 text-red-500" />, bg: 'bg-red-50' },
  { name: 'Anesthesiology', icon: <Syringe className="w-8 h-8 text-blue-500" />, bg: 'bg-blue-50' },
  { name: 'Pediatrics', icon: <Baby className="w-8 h-8 text-pink-500" />, bg: 'bg-pink-50' },
  { name: 'Ophthalmology', icon: <Eye className="w-8 h-8 text-rose-500" />, bg: 'bg-rose-50' },
  { name: 'Oncology', icon: <Activity className="w-8 h-8 text-red-600" />, bg: 'bg-red-50' },
  { name: 'Dermatology', icon: <User className="w-8 h-8 text-orange-400" />, bg: 'bg-orange-50' },
  { name: 'Pathology', icon: <Microscope className="w-8 h-8 text-amber-500" />, bg: 'bg-amber-50' },
  { name: 'Psychiatry', icon: <Brain className="w-8 h-8 text-purple-500" />, bg: 'bg-purple-50' },
  { name: 'Surgery', icon: <Stethoscope className="w-8 h-8 text-teal-500" />, bg: 'bg-teal-50' },
  { name: 'Cardiology', icon: <Heart className="w-8 h-8 text-red-500" />, bg: 'bg-red-50' },
  { name: 'Orthopedics', icon: <Bone className="w-8 h-8 text-yellow-600" />, bg: 'bg-yellow-50' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-6">
      <TopBar 
        title="Find Your Doctor" 
        showBack={true} 
        rightAction={<button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50"><Search className="w-5 h-5 text-gray-700" /></button>}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6 p-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 text-center cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => navigate(`/doctors?category=${encodeURIComponent(cat.name)}`)}>
            <div className={`w-[88px] h-[88px] md:w-28 md:h-28 rounded-full flex items-center justify-center ${cat.bg} shadow-sm hover:shadow-lg transition-all`}>
              {React.cloneElement(cat.icon, { className: 'w-10 h-10 md:w-12 md:h-12 opacity-90 stroke-current color-inherit' }) || cat.icon}
            </div>
            <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
