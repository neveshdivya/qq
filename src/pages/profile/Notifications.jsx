import React from 'react';
import TopBar from '../../components/TopBar';
import { useAppContext } from '../../context/AppContext';

const NotificationsPage = () => {
  const { notifications, toggleNotification } = useAppContext();

  const settingItems = [
    { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get SMS & email alerts before your visits' },
    { key: 'promotions', label: 'Promotions & Offers', desc: 'Receive exclusive deals and health packages' },
    { key: 'newMessages', label: 'New Messages', desc: 'Alerts when doctors reply to your questions' },
    { key: 'systemAlerts', label: 'System Alerts', desc: 'Security notices and app updates' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Notifications" showBack={true} />

      <div className="max-w-xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left">
          {settingItems.map((item, index) => (
            <div key={item.key} className={`flex items-center justify-between p-5 ${index !== settingItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="pr-4">
                <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
              </div>
              <button 
                onClick={() => toggleNotification(item.key)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
