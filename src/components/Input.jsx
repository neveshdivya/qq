import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, icon = null }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full border border-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
