import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import { useAppContext } from '../../context/AppContext';

const PersonalData = () => {
  const { userProfile, setUserProfile } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userProfile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserProfile(formData);
    alert('Personal data updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Personal Data" showBack={true} />
      
      <div className="max-w-xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-teal-50 object-cover" />
              <button className="absolute bottom-0 right-0 bg-[var(--color-primary)] text-white p-2 rounded-full shadow-md text-xs">
                Edit
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-xs text-red-500">(Read Only)</span></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              readOnly
              className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              rows="3"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" 
            ></textarea>
          </div>

          <button onClick={handleSave} className="w-full mt-6 bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-md hover:bg-teal-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
