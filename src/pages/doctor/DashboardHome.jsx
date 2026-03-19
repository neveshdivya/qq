import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Activity, Users, CalendarCheck, Clock } from 'lucide-react';

const DashboardHome = () => {
  const { doctorUser, appointments } = useAppContext();
  
  // Get appointments for the doctor
  const doctorId = doctorUser?.id || 1;
  const doctorName = doctorUser?.name || 'Dr. Taylor';
  const upcomingAppointments = appointments.filter(a => a.doctorId === doctorId && a.status === 'Upcoming');
  const completedAppointments = appointments.filter(a => a.doctorId === doctorId && a.status === 'Completed');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-teal-50">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 mb-2">
            Welcome Back, {doctorName}!
          </h1>
          <p className="text-gray-500 text-lg">Here's your overview for today.</p>
        </div>
        <div className="text-left md:text-right mt-4 md:mt-0 bg-teal-50 px-6 py-4 rounded-2xl border border-teal-100">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Today</p>
          <p className="text-2xl font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Appts", value: upcomingAppointments.length, icon: CalendarCheck, color: 'bg-blue-100 text-blue-600' },
          { label: 'Completed Appts', value: completedAppointments.length, icon: Users, color: 'bg-teal-100 text-teal-600' },
          { label: 'Pending Reviews', value: '4', icon: Activity, color: 'bg-orange-100 text-orange-600' },
          { label: 'Total Hours', value: '6h', icon: Clock, color: 'bg-purple-100 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Next Appointment */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Next Appointment</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-teal-600 font-bold shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {upcomingAppointments[0].patientData?.name || `Patient #${upcomingAppointments[0].id}`}
              </h3>
              <p className="text-sm text-gray-500">
                {upcomingAppointments[0].date} • {upcomingAppointments[0].time}
              </p>
            </div>
            <a href="/doctor/dashboard/appointments" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700">
              View Specifics
            </a>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming appointments scheduled right now.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
