import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import Button from '../../components/Button';

const AvailabilitySettings = () => {
  const { doctorUser, doctorAvailability, updateDoctorAvailability } = useAppContext();
  // Safe fallback if context doesn't have it yet for this doctor id
  const doctorId = doctorUser?.id || 1; 
  const currentAvailability = doctorAvailability[doctorId] || [];

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('');

  const handleAddTimeSlot = () => {
    if (!newTime) return;

    // Format time: simplest way is just adding the string
    let updatedAvailability = [...currentAvailability];
    let dayIndex = updatedAvailability.findIndex(day => day.date === selectedDate);
    
    if (dayIndex >= 0) {
      if (!updatedAvailability[dayIndex].timeSlots.includes(newTime)) {
        updatedAvailability[dayIndex].timeSlots.push(newTime);
        // Sort times simply (assuming standard formats or 24h)
        updatedAvailability[dayIndex].timeSlots.sort();
      }
    } else {
      updatedAvailability.push({ date: selectedDate, timeSlots: [newTime] });
    }

    updateDoctorAvailability(doctorId, updatedAvailability);
    setNewTime('');
  };

  const handleRemoveTimeSlot = (date, time) => {
    let updatedAvailability = currentAvailability.map(day => {
      if (day.date === date) {
        return { ...day, timeSlots: day.timeSlots.filter(t => t !== time) };
      }
      return day;
    }).filter(day => day.timeSlots.length > 0);

    updateDoctorAvailability(doctorId, updatedAvailability);
  };

  // Find slots for selected date
  const slotsForSelectedDate = currentAvailability.find(day => day.date === selectedDate)?.timeSlots || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Availability Settings</h1>
      <p className="text-gray-500">Manage your available time slots for patient appointments. Changes here instantly update the booking portal.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-8">
        {/* Date Picker Side */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-medium text-gray-700 bg-gray-50"
            />
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="font-medium text-gray-800 mb-2">Upcoming Days Defined</h3>
            <ul className="space-y-2">
              {currentAvailability.slice(0, 5).map(day => (
                <li 
                  key={day.date} 
                  className={`text-sm cursor-pointer p-2 rounded-lg transition-colors ${selectedDate === day.date ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} 
                  <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{day.timeSlots.length}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Time Slots Side */}
        <div className="w-full md:w-2/3">
          <div className="flex items-end gap-2 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Add New Time Slot</label>
              <input 
                type="time" 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
            <Button onClick={handleAddTimeSlot} className="bg-teal-600 hover:bg-teal-700 text-white pb-2.5 pt-2.5">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">
            Time Slots for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>

          {slotsForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slotsForSelectedDate.map(time => (
                <div key={time} className="flex items-center justify-between p-3 bg-white border border-teal-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <span className="font-medium text-gray-800">{time}</span>
                  <button 
                    onClick={() => handleRemoveTimeSlot(selectedDate, time)}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 group-hover:bg-red-50 p-1.5 rounded-md"
                    title="Remove Slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No time slots set for this date.</p>
              <p className="text-sm text-gray-400 mt-1">Add a slot above to open bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySettings;
