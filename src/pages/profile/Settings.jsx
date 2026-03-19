import React from 'react';
import TopBar from '../../components/TopBar';
import { useAppContext } from '../../context/AppContext';

const SettingsPage = () => {
  const { settings, updateSettings } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Settings" showBack={true} />

      <div className="max-w-xl mx-auto px-6 py-6 space-y-6">
        
        {/* App Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-sm tracking-widest uppercase">App Preferences</h3>
          </div>
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <span className="font-semibold text-gray-800">Language</span>
            <select 
              value={settings.language} 
              onChange={(e) => updateSettings('language', e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2"
            >
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
            </select>
          </div>
          <div className="p-5 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Dark Mode</span>
            <button 
              onClick={() => updateSettings('darkMode', !settings.darkMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${settings.darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-sm tracking-widest uppercase">Security & Privacy</h3>
          </div>
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div>
              <span className="block font-semibold text-gray-800 mb-1">Privacy Mode</span>
              <span className="text-xs text-gray-500">Control who can see your public medical reviews.</span>
            </div>
            <select 
              value={settings.privacyMode} 
              onChange={(e) => updateSettings('privacyMode', e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
