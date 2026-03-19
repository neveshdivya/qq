import React, { useState, useEffect } from 'react';
import { Search, History, MessageSquare, ChevronRight, ClipboardList, AlertCircle, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const PatientRecords = () => {
  const { patientsData, isLoadingPatients, patientsError, fetchPatients } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patientsData.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]">
      
      {/* Search & List Pane */}
      <div className={`w-full md:w-1/3 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${selectedPatient ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Patient Records</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoadingPatients ? (
            <div className="flex justify-center items-center p-8 text-teal-600">
              <RefreshCcw className="w-6 h-6 animate-spin" />
            </div>
          ) : patientsError ? (
            <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl m-2 border border-red-100 flex flex-col items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              <p className="text-sm font-medium">{patientsError}</p>
              <button onClick={() => fetchPatients()} className="text-xs underline mt-1 text-red-600 hover:text-red-700">Retry</button>
            </div>
          ) : (
            filteredPatients.map(patient => (
              <button
                key={patient._id || patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${selectedPatient?._id === patient._id ? 'bg-teal-50 border border-teal-100' : 'hover:bg-gray-50 border border-transparent'}`}
              >
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold shrink-0">
                {patient.name?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{patient.name}</h3>
                <p className="text-xs text-gray-500 truncate">Age: {patient.age || 'N/A'}</p>
              </div>
              <ChevronRight className={`w-4 h-4 ${selectedPatient?._id === patient._id ? 'text-teal-600' : 'text-gray-400'}`} />
            </button>
          )))}
          {!isLoadingPatients && !patientsError && filteredPatients.length === 0 && (
            <p className="text-center text-sm text-gray-500 p-4">No patients found.</p>
          )}
        </div>
      </div>

      {/* Detail Pane */}
      <div className={`w-full md:w-2/3 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${!selectedPatient ? 'hidden md:flex' : 'flex'}`}>
        {!selectedPatient ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
            <History className="w-16 h-16 mb-4 text-gray-200" />
            <p className="text-lg font-medium text-gray-500">Select a patient</p>
            <p className="text-sm mt-1 text-center">Click on a patient from the list to view their records and history.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-start gap-4">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="md:hidden mt-2 p-1 text-gray-400 hover:text-gray-800"
              >
                ← Back
              </button>
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-2xl border-2 border-white shadow-sm shrink-0">
                {selectedPatient.name?.charAt(0) || '?'}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                  <span><span className="font-medium text-gray-800">Age:</span> {selectedPatient.age || 'N/A'}</span>
                  <span><span className="font-medium text-gray-800">Record ID:</span> {selectedPatient._id}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md">{selectedPatient.issue || 'No chief complaint'}</span>
                </div>
              </div>
            </div>

            {/* Content areas (SOAP and Chat) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* SOAP Notes Full JSON view */}
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-teal-600" />
                  Full Clinical Report (SOAP JSON)
                </h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm text-sm overflow-x-auto">
                  <pre className="text-gray-700 font-mono text-xs whitespace-pre-wrap">
                    {JSON.stringify(selectedPatient.fullReport || {}, null, 2)}
                  </pre>
                </div>
              </section>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
