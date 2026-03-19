import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import TopBar from '../components/TopBar';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'david.bell@example.com',
    phone: '+1 987 555 5432',
    password: 'password123',
    confirmPassword: 'password123'
  });

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.password === formData.confirmPassword) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar showBack={true} />
      
      <div className="px-6 py-4 flex flex-col items-center">
        <div className="mb-4 p-4 bg-teal-50 rounded-full">
          <HeartPulse className="w-12 h-12 text-[var(--color-primary)]" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
        <p className="text-gray-400 mb-8">Create New Account</p>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="DavidBell@Example.com"
            value={formData.email}
            onChange={(e) => handleChange(e, 'email')}
          />
          <Input 
            type="tel" 
            placeholder="+1 9xx 5xx 5xxx"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
          />
          <Input 
            type="password" 
            placeholder="**********"
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')}
          />
          <Input 
            type="password" 
            placeholder="**********"
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, 'confirmPassword')}
          />

          <p className="text-xs text-gray-500 mt-6 mb-8 text-center px-4 leading-relaxed">
            By signing below, you agree to the <span className="text-[var(--color-primary)] font-medium">Team of use</span> and <span className="text-[var(--color-primary)] font-medium">privacy notice</span>
          </p>

          <Button type="submit" className="mb-8">Sign Up</Button>
        </form>

        <p className="text-sm text-gray-600">
          Already have an account? <button onClick={() => navigate('/')} className="text-[var(--color-primary)] font-semibold hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
