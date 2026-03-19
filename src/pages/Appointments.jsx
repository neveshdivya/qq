import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { doctorsData } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [rescheduleData, setRescheduleData] = useState(null); // stores { id, newDate } etc.
  const { appointments, updateAppointmentStatus, rescheduleAppointment } = useAppContext();

  // Combine appointments with actual doctor data
  const populatedAppointments = appointments.map(appt => ({
    ...appt,
    doctor: doctorsData.find(d => d.id === appt.doctorId) || doctorsData[0]
  }));

  const filteredAppointments = populatedAppointments.filter(appt => appt.status === activeTab);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      updateAppointmentStatus(id, 'Canceled');
    }
  };

  const openRescheduleModal = (id) => {
    setRescheduleData(id);
  };

  const confirmReschedule = () => {
    // Generate a random future date string for demo
    const nextDays = ['Wed, 28 Aug', 'Thu, 29 Aug', 'Fri, 30 Aug'];
    const randomDate = nextDays[Math.floor(Math.random() * nextDays.length)];
    const randomTime = '03:00 PM';
    
    rescheduleAppointment(rescheduleData, randomDate, randomTime);
    setRescheduleData(null);
    alert('Appointment successfully rescheduled to ' + randomDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      <TopBar title="My Appointments" showBack={true} />

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm p-1">
          <button 
            onClick={() => setActiveTab('Upcoming')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'Upcoming' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('Completed')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'Completed' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setActiveTab('Canceled')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'Canceled' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Canceled
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? filteredAppointments.map(appt => (
            <div key={appt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
                <div className="flex gap-4">
                  <img src={appt.doctor.image} alt={appt.doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{appt.doctor.name}</h3>
                    <p className="text-sm font-medium text-[var(--color-primary)]">{appt.doctor.category}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                  {appt.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{appt.date}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{appt.time}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold truncate max-w-[150px]">{appt.doctor.location}</span>
                </div>
              </div>

              {appt.status === 'Upcoming' && (
                <div className="flex gap-3 pt-4 border-t border-gray-50">
                  <button onClick={() => handleCancel(appt.id)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={() => openRescheduleModal(appt.id)} className="flex-1 py-2.5 bg-[var(--color-primary)] text-white font-bold rounded-xl shadow-sm hover:shadow-md hover:bg-teal-700 transition-all">Reschedule</button>
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-10 text-gray-500">
              <p>You have no {activeTab.toLowerCase()} appointments.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reschedule Modal Overlay */}
      {rescheduleData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reschedule Appointment</h3>
            <p className="text-sm text-gray-500 mb-6">Pick a new date and time for your appointment. For this demo, confirming will assign the next available slot.</p>
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setRescheduleData(null)} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 rounded-xl hover:bg-gray-200">Close</button>
              <button onClick={confirmReschedule} className="flex-1 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-teal-700">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Appointments;
