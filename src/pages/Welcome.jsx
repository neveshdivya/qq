import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { HeartPulse, Stethoscope } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@medicare.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* Logo Area */}
        <div className="mb-6 p-6 bg-teal-50 rounded-full">
          <HeartPulse className="w-16 h-16 text-[var(--color-primary)]" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome To</h1>
        <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-8">Medicare!</h1>

        <form onSubmit={handleLogin} className="w-full mb-6">
          <Input 
            type="email" 
            placeholder="Email (e.g. user@medicare.com)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="Password (e.g. password123)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-6 space-y-4">
            <Button type="submit">Login</Button>
            <Button variant="outline" type="button" onClick={() => navigate('/register')}>Sign Up</Button>
          </div>
        </form>

        <div className="relative flex items-center w-full mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="flex gap-4 w-full mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="font-semibold text-sm">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            <span className="font-semibold text-sm">Facebook</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Don't have an account? <button onClick={() => navigate('/register')} className="text-[var(--color-primary)] font-semibold hover:underline">Sign Up</button>
        </p>

        <div className="w-full pt-4 border-t border-gray-100 flex justify-center">
          <button 
            onClick={() => navigate('/doctor/login')} 
            className="flex items-center gap-2 text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors bg-teal-50 px-4 py-2 rounded-full"
          >
            <Stethoscope className="w-4 h-4" />
            Doctor Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
