import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Stethoscope } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { doctorCredentials } from '../../data/mockData';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { setDoctorUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === doctorCredentials.email && password === doctorCredentials.password) {
      setDoctorUser({ id: doctorCredentials.doctorId, email });
      navigate('/doctor/dashboard');
    } else {
      setError('Invalid doctor credentials');
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-[var(--color-primary)] text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your appointments</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
            <Input 
              type="email" 
              placeholder="doctor@medicare.com" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              required
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              Sign In to Portal
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
          >
            ← Back to Patient Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
