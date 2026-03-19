import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyles = 'w-full py-4 rounded-md font-semibold text-center transition-opacity flex justify-center items-center';
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-[var(--color-primary)] bg-transparent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
