import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import { MoreHorizontal, ArrowLeft } from 'lucide-react';
import { doctorsData } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAppointment, doctorAvailability } = useAppContext();
  // Find doctor by string or int id, fallback to first doctor if not found for robust demo
  const doctor = doctorsData.find(d => d.id.toString() === id) || doctorsData[0];

  const drAvailability = doctorAvailability[doctor.id] || [];
  
  // Create dates array based on availability or static fallback
  const dates = drAvailability.length > 0 ? drAvailability.map(day => {
    // Add timezone offset correction or just parse as simple local dates
    const parts = day.date.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]); // local date
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: day.date,
      timeSlots: day.timeSlots
    };
  }) : [
    { day: 'FRI', date: '16', month: 'Aug', fullDate: '16 Aug', timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
    { day: 'SAT', date: '17', month: 'Aug', fullDate: '17 Aug', timeSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
    { day: 'SUN', date: '18', month: 'Aug', fullDate: '18 Aug', timeSlots: ['09:00 AM', '11:00 AM'] },
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0]?.date || '16');
  
  // Find times for selected date
  const selectedDateObj = dates.find(d => d.date === selectedDate) || dates[0];
  const times = selectedDateObj?.timeSlots || [];

  const [selectedTime, setSelectedTime] = useState(times[0] || '');

  // (Removed static dates/times definition since it's above now)

  const handleBooking = () => {
    // Save to global context
    const dateObj = dates.find(d => d.date === selectedDate);
    const newAppt = {
      doctorId: doctor.id,
      date: `${dateObj.day}, ${dateObj.date} ${dateObj.month}`,
      time: selectedTime,
      status: 'Upcoming'
    };
    addAppointment(newAppt);
    // Navigate to shared /booking route (appointments page)
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <TopBar 
        title="Doctor Details" 
        showBack={true} 
        rightAction={<button className="p-2"><MoreHorizontal className="w-6 h-6 text-gray-800" /></button>}
      />

      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Doctor Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 relative overflow-hidden flex gap-4">
          <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-2xl object-cover z-10" />
          <div className="z-10 flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h2>
            <div className="bg-teal-50 px-3 py-2 rounded-lg inline-block w-full">
              <p className="text-xs font-semibold text-gray-700 mb-1">{doctor.specialty}</p>
              <p className="text-xs text-[var(--color-primary)] font-bold">Experience : <span className="text-red-500">{doctor.experience} Years</span></p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          <span className="px-4 py-2 bg-teal-50 text-[var(--color-primary)] font-semibold text-sm rounded-full shrink-0">{doctor.category}</span>
          <span className="px-4 py-2 bg-orange-50 text-orange-600 font-semibold text-sm rounded-full shrink-0">{doctor.specialty.split(',')[1] || 'General'}</span>
          <span className="px-4 py-2 bg-blue-50 text-blue-600 font-semibold text-sm rounded-full shrink-0">Medicine</span>
        </div>

        {/* Biography */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Doctor Biography</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {doctor.biography}
          </p>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[var(--color-primary)] font-bold">Select Date</h3>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
              📅 {selectedDateObj?.date} {selectedDateObj?.month}, {selectedDateObj?.day}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {dates.map((d, i) => (
              <button 
                key={i}
                onClick={() => { setSelectedDate(d.date); setSelectedTime(d.timeSlots[0] || ''); }}
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl shrink-0 min-w-[70px] border ${selectedDate === d.date ? 'bg-[var(--color-primary)] text-white border-transparent shadow-md' : 'bg-gray-50 border-gray-100 text-gray-600'}`}
              >
                <span className={`text-xs font-bold mb-1 ${selectedDate === d.date ? 'text-teal-100' : 'text-gray-400'}`}>{d.day}</span>
                <span className="text-xl font-bold">{d.date}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 border border-pink-100 bg-pink-50 text-pink-600 rounded-lg text-sm font-semibold flex items-center gap-2">
            📅 Specific Date
          </button>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
           <h3 className="text-[var(--color-primary)] font-bold mb-4">Select Time</h3>
           {times.length > 0 ? (
             <div className="grid grid-cols-3 gap-3">
               {times.map((t, i) => {
                 return (
                   <button 
                    key={i}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl text-sm font-bold border ${selectedTime === t ? 'bg-[var(--color-primary)] text-white border-transparent shadow-md' : 'bg-teal-50 border-teal-50 text-teal-800'}`}
                   >
                     {t}
                   </button>
                 );
               })}
             </div>
           ) : (
             <p className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">No time slots available for this date.</p>
           )}
        </div>

      </div>

      {/* Book Appointment Floating Button */}
      <div className="fixed bottom-16 left-0 right-0 p-6 z-40 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full pointer-events-auto">
          <button onClick={handleBooking} className="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DoctorProfile;
