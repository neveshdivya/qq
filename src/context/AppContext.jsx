import React, { createContext, useState, useContext } from 'react';
import { doctorsData, initialDoctorAvailability } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Doctor Portal State
  const [doctorUser, setDoctorUser] = useState(null);
  const [doctorAvailability, setDoctorAvailability] = useState(initialDoctorAvailability);

  // Patients Data State (from MongoDB backend)
  const [patientsData, setPatientsData] = useState([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [patientsError, setPatientsError] = useState(null);

  const fetchPatients = async () => {
    setIsLoadingPatients(true);
    setPatientsError(null);
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch patients');
      }
      const data = await response.json();
      setPatientsData(data);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setPatientsError(err.message);
    } finally {
      setIsLoadingPatients(false);
    }
  };

  const updateDoctorAvailability = (doctorId, newAvailability) => {
    setDoctorAvailability(prev => ({
      ...prev,
      [doctorId]: newAvailability
    }));
  };

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Frank Williamson',
    email: 'frank.williamson@example.com',
    phone: '+1 123 456 7890',
    gender: 'Male',
    dateOfBirth: '1985-06-15',
    address: '123 Health Ave, New York, NY 10001'
  });

  // Favorite Doctors State (array of doctor IDs)
  const [favoriteDoctors, setFavoriteDoctors] = useState([1, 4, 7]);

  const toggleFavorite = (doctorId) => {
    setFavoriteDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  // Notifications State
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    promotions: false,
    newMessages: true,
    systemAlerts: true
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Settings State
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'English',
    privacyMode: 'Public'
  });

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: 101,
      doctorId: 1, // Changed to Dr. Robert Taylor for testing
      date: 'Mon, 19 Aug',
      time: '10:00 AM',
      status: 'Upcoming',
      patientData: { name: 'Emily Chen', age: 28, issue: 'Routine Checkup' }
    },
    {
      id: 102,
      doctorId: 1, // Changed to Dr. Robert Taylor for testing
      date: 'Mon, 19 Aug',
      time: '02:30 PM',
      status: 'Upcoming',
      patientData: { name: 'Michael Rodriguez', age: 45, issue: 'Follow-up' }
    },
    {
      id: 103,
      doctorId: 1,
      date: 'Wed, 14 Aug',
      time: '11:00 AM',
      status: 'Completed',
      patientData: { name: 'Sarah Williams', age: 32, issue: 'Consultation' }
    }
  ]);

  const addAppointment = (appt) => {
    setAppointments(prev => [{...appt, id: Date.now()}, ...prev]);
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: newStatus } : appt));
  };
  
  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, date: newDate, time: newTime } : appt));
  };

  return (
    <AppContext.Provider value={{
      userProfile, setUserProfile,
      favoriteDoctors, toggleFavorite,
      notifications, toggleNotification,
      settings, updateSettings,
      appointments, addAppointment, updateAppointmentStatus, rescheduleAppointment,
      doctorUser, setDoctorUser,
      doctorAvailability, updateDoctorAvailability,
      // MongoDB Patients
      patientsData, isLoadingPatients, patientsError, fetchPatients
    }}>
      {children}
    </AppContext.Provider>
  );
};
