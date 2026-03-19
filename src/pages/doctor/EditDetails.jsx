import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Camera } from 'lucide-react';

const EditDetails = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. Robert Taylor',
    specialty: 'Dentistry',
    phone: '+1 234 567 8900',
    bio: 'Dr. Robert Taylor is a highly skilled dentist specializing in advanced dental procedures and cosmetic dentistry.',
    location: 'City Hospital, NY'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Personal Details</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4 group cursor-pointer">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 border-teal-50"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <button className="text-sm font-medium text-teal-600 hover:text-teal-700">Change Photo</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
              <Input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Specialty</label>
              <Input 
                value={formData.specialty}
                onChange={e => setFormData({...formData, specialty: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number</label>
              <Input 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Location / Clinic</label>
              <Input 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Biography</label>
            <textarea
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none shadow-sm"
              rows="4"
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
              Save Changes
            </Button>
            {saved && <span className="text-sm text-green-600 font-medium">Changes saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
