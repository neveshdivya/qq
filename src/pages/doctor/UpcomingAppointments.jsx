import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FileJson, Calendar as CalendarIcon, Clock, User, CheckCircle, X, Activity, NotepadText } from 'lucide-react';

const UpcomingAppointments = () => {
  const navigate = useNavigate();
  const { doctorUser, appointments, updateAppointmentStatus } = useAppContext();
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Filter for upcoming appointments for this doctor
  const upcoming = appointments.filter(a => a.doctorId === (doctorUser?.id || 1) && a.status === 'Upcoming');

  const handleAttend = (id) => {
    updateAppointmentStatus(id, 'Completed');
    alert('Session marked as completed. Redirecting to Dashboard Home...');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h1>
        <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
          {upcoming.length} Total
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {upcoming.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {upcoming.map((appt, idx) => (
              <div key={appt.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 font-bold border border-teal-100">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {appt.patientData?.name || `Patient #${appt.id}`}
                    </h3>
                    <p className="text-sm font-medium text-teal-600">
                      {appt.patientData?.issue || 'General Checkup'}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {appt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {appt.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto justify-end">
                  {/* Mock JSON report link */}
                  <button 
                    onClick={() => setSelectedReport(appt)}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                  >
                    <FileJson className="w-4 h-4" />
                    View Report
                  </button>
                  
                  <button 
                    onClick={() => handleAttend(appt.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Attend Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium text-gray-600">No upcoming appointments</p>
            <p className="text-sm mt-1">Your schedule is currently clear.</p>
          </div>
        )}
      </div>

      {/* JSON Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-teal-100 flex justify-between items-center bg-teal-50 rounded-t-2xl">
              <h3 className="font-bold text-teal-900 flex items-center gap-2">
                <NotepadText className="w-5 h-5 text-teal-600" />
                Medical Report: {selectedReport.patientData?.name || `Patient #${selectedReport.id}`}
              </h3>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1 text-teal-600 hover:bg-teal-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-white text-gray-800 rounded-b-2xl">
              
              {/* Header Info */}
              <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Patient ID</p>
                  <p className="font-medium">#{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Appointment Date</p>
                  <p className="font-medium flex items-center gap-1"><CalendarIcon className="w-4 h-4 text-teal-600" /> {selectedReport.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Time</p>
                  <p className="font-medium flex items-center gap-1"><Clock className="w-4 h-4 text-teal-600" /> {selectedReport.time}</p>
                </div>
              </div>

              {/* Vitals Section */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Recent Vitals (Self-Reported)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Blood Pressure</p>
                    <p className="text-lg font-bold text-gray-800">120/80</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Heart Rate</p>
                    <p className="text-lg font-bold text-gray-800">72 <span className="text-sm font-normal text-gray-500">bpm</span></p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Temperature</p>
                    <p className="text-lg font-bold text-gray-800">98.6 <span className="text-sm font-normal text-gray-500">°F</span></p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Weight</p>
                    <p className="text-lg font-bold text-gray-800">165 <span className="text-sm font-normal text-gray-500">lbs</span></p>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">Prior Medical History</h4>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-700 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                  <li>No known drug allergies.</li>
                  <li>Previous surgery: Appendectomy (2015).</li>
                  <li>Family history of mild hypertension.</li>
                </ul>
              </div>

              {/* Clinical Notes */}
              <div>
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">Prelim Clinical Notes</h4>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-sm text-gray-700 leading-relaxed">
                  Patient requested a full checkup. Experiencing mild fatigue recently, likely related to stress or sleep schedule. Primary concern is {selectedReport.patientData?.issue || 'routine evaluation'}. No acute distress noted in preliminary triage.
                </div>
              </div>

            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close Report
              </button>
              <button 
                onClick={() => { setSelectedReport(null); handleAttend(selectedReport.id); }}
                className="px-6 py-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Attend Session Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
