export const doctorCategories = [
  'General Physician', 'Nephrology', 'Anesthesiology', 'Pediatrics', 
  'Ophthalmology', 'Oncology', 'Dermatology', 'Pathology', 
  'Psychiatry', 'Surgery', 'Cardiology', 'Orthopedics', 'Dentistry', 'Neurology'
];

export const doctorsData = [
  { id: 1, name: 'Dr. Robert Taylor', specialty: 'MDS, FDS RCPS', category: 'Dentistry', rating: '4.6', reviews: '253', fees: '$150', status: 'Available', location: 'City Hospital, NY', image: 'https://randomuser.me/api/portraits/men/32.jpg', experience: '10+', biography: 'Dr. Robert Taylor is a highly skilled dentist specializing in advanced dental procedures and cosmetic dentistry.' },
  { id: 2, name: 'Dr. Michael Smith', specialty: 'BDS, Dentistry', category: 'Dentistry', rating: '4.7', reviews: '340', fees: '$200', status: 'Next Available: Tommorow', location: 'Sunrise Clinic, CA', image: 'https://randomuser.me/api/portraits/men/44.jpg', experience: '8', biography: 'Dr. Smith focuses on preventive care and comprehensive dental health for all age groups.' },
  { id: 3, name: 'Dr. Sarah Connor', specialty: 'MD, Neurology', category: 'Neurology', rating: '4.9', reviews: '1.2k', fees: '$250', status: 'Available', location: 'General Hospital, WA', image: 'https://randomuser.me/api/portraits/women/44.jpg', experience: '15+', biography: 'Dr. Connor is a leading expert in treating neurological disorders, including migraines, epilepsy, and stroke.' },
  { id: 4, name: 'Dr. James White', specialty: 'MS, Orthopedics', category: 'Orthopedics', rating: '4.5', reviews: '112', fees: '$180', status: 'Next Available: 2 PM', location: 'HealthCare Inc, TX', image: 'https://randomuser.me/api/portraits/men/22.jpg', experience: '12+', biography: 'Specializing in sports injuries and joint replacement surgery, Dr. White provides comprehensive orthopedic care.' },
  { id: 5, name: 'Dr. Emily Davis', specialty: 'MD, Pediatrics', category: 'Pediatrics', rating: '4.8', reviews: '890', fees: '$120', status: 'Available', location: 'Pediatric Center, FL', image: 'https://randomuser.me/api/portraits/women/33.jpg', experience: '7', biography: 'Dr. Davis is passionate about children’s health and well-being, focusing on preventive care and early interventions.' },
  { id: 6, name: 'Dr. John Doe', specialty: 'MBBS, General Medicine', category: 'General Physician', rating: '4.4', reviews: '56', fees: '$90', status: 'Available', location: 'Community Clinic, IL', image: 'https://randomuser.me/api/portraits/men/11.jpg', experience: '5', biography: 'Dr. Doe operates a friendly community clinic for routine checkups and general ailments.' },
  { id: 7, name: 'Dr. Alice Brown', specialty: 'MD, Dermatology', category: 'Dermatology', rating: '4.7', reviews: '420', fees: '$160', status: 'Available', location: 'Skin Clinic, NV', image: 'https://randomuser.me/api/portraits/women/12.jpg', experience: '9', biography: 'Dr. Brown treats a variety of skin conditions including acne, eczema, and skin cancer screenings.' },
  { id: 8, name: 'Dr. Mark Lee', specialty: 'MD, Cardiology', category: 'Cardiology', rating: '4.9', reviews: '1.5k', fees: '$300', status: 'Next Available: Friday', location: 'Heart Center, NY', image: 'https://randomuser.me/api/portraits/men/55.jpg', experience: '20+', biography: 'Dr. Lee is a highly sought-after cardiologist with over two decades of experience in complex heart conditions.' },
  { id: 9, name: 'Dr. Lisa Wong', specialty: 'MD, Oncology', category: 'Oncology', rating: '4.8', reviews: '310', fees: '$280', status: 'Available', location: 'Hope Institute, CA', image: 'https://randomuser.me/api/portraits/women/50.jpg', experience: '14+', biography: 'Dr. Wong provides compassionate and cutting-edge oncological care to her patients.' },
  { id: 10, name: 'Dr. Tom Harris', specialty: 'MD, Psychiatry', category: 'Psychiatry', rating: '4.5', reviews: '180', fees: '$150', status: 'Available', location: 'Mental Wellness, OR', image: 'https://randomuser.me/api/portraits/men/66.jpg', experience: '10', biography: 'Dr. Harris specializes in cognitive behavioral therapy and psychiatric medication management.' },
  { id: 11, name: 'Dr. Nancy Clark', specialty: 'MS, Surgery', category: 'Surgery', rating: '4.6', reviews: '290', fees: '$400', status: 'Next Available: Monday', location: 'City Hospital, NY', image: 'https://randomuser.me/api/portraits/women/55.jpg', experience: '18+', biography: 'Dr. Clark is a board-certified general surgeon known for minimally invasive procedures.' },
  { id: 12, name: 'Dr. Kevin Adams', specialty: 'MD, Ophthalmology', category: 'Ophthalmology', rating: '4.7', reviews: '450', fees: '$130', status: 'Available', location: 'Eye Care Center, TX', image: 'https://randomuser.me/api/portraits/men/33.jpg', experience: '11+', biography: 'Dr. Adams handles comprehensive eye exams, LASIK consultations, and glaucoma treatments.' },
  { id: 13, name: 'Dr. Maria Garcia', specialty: 'MBBS, Pediatrics', category: 'Pediatrics', rating: '4.9', reviews: '670', fees: '$110', status: 'Available', location: 'Kids Clinic, FL', image: 'https://randomuser.me/api/portraits/women/65.jpg', experience: '13+', biography: 'Dr. Garcia provides excellent holistic pediatric care with a focus on child nutrition.' },
  { id: 14, name: 'Dr. Peter Clark', specialty: 'MD, Nephrology', category: 'Nephrology', rating: '4.5', reviews: '80', fees: '$220', status: 'Available', location: 'Renal Center, WA', image: 'https://randomuser.me/api/portraits/men/71.jpg', experience: '8', biography: 'Dr. Clark specializes in kidney disorders, dialysis management, and hypertension.' },
  { id: 15, name: 'Dr. Helen Martinez', specialty: 'MD, Pathology', category: 'Pathology', rating: '4.4', reviews: '50', fees: '$100', status: 'Available', location: 'Diagnostic Labs, NY', image: 'https://randomuser.me/api/portraits/women/72.jpg', experience: '6', biography: 'Dr. Martinez oversees clinical diagnostics and laboratory medicine.' },
  { id: 16, name: 'Dr. Richard Lewis', specialty: 'MD, Anesthesiology', category: 'Anesthesiology', rating: '4.6', reviews: '120', fees: '$260', status: 'Available', location: 'Surgery Center, CA', image: 'https://randomuser.me/api/portraits/men/76.jpg', experience: '15', biography: 'Dr. Lewis is an expert in pain management and critical care anesthesia.' },
  { id: 17, name: 'Dr. Susan Young', specialty: 'MD, General Physician', category: 'General Physician', rating: '4.8', reviews: '900', fees: '$95', status: 'Available', location: 'Wellness Clinic, IL', image: 'https://randomuser.me/api/portraits/women/81.jpg', experience: '22+', biography: 'Dr. Young is a highly trusted family physician active in her local community.' },
  { id: 18, name: 'Dr. David King', specialty: 'MD, Cardiology', category: 'Cardiology', rating: '4.7', reviews: '540', fees: '$290', status: 'Available', location: 'Heart Center, NY', image: 'https://randomuser.me/api/portraits/men/84.jpg', experience: '16+', biography: 'Dr. King specializes in interventional cardiology and structural heart disease.' },
  { id: 19, name: 'Dr. Laura Wright', specialty: 'MD, Dermatology', category: 'Dermatology', rating: '4.9', reviews: '820', fees: '$175', status: 'Available', location: 'Skin Clinic, NV', image: 'https://randomuser.me/api/portraits/women/90.jpg', experience: '12+', biography: 'Dr. Wright is a leading expert in cosmetic dermatology and laser treatments.' },
  { id: 20, name: 'Dr. William Turner', specialty: 'MS, Orthopedics', category: 'Orthopedics', rating: '4.5', reviews: '330', fees: '$190', status: 'Available', location: 'HealthCare Inc, TX', image: 'https://randomuser.me/api/portraits/men/91.jpg', experience: '9', biography: 'Dr. Turner provides specialized care for spinal disorders and back pain.' },
  { id: 21, name: 'Dr. Rachel Scott', specialty: 'MD, Psychiatry', category: 'Psychiatry', rating: '4.8', reviews: '410', fees: '$160', status: 'Available', location: 'Mental Wellness, OR', image: 'https://randomuser.me/api/portraits/women/95.jpg', experience: '11', biography: 'Dr. Scott is passionate about helping patients manage anxiety and depression.' }
];

export const doctorCredentials = {
  email: 'doctor@medicare.com',
  password: 'password123',
  doctorId: 1
};

export const patientRecords = [
  {
    id: 1,
    name: 'Emily Chen',
    age: 28,
    gender: 'Female',
    lastVisit: '2023-11-15',
    diagnosis: 'Seasonal Allergies',
    image: 'https://randomuser.me/api/portraits/women/15.jpg',
    jsonReportUrl: '/reports/emily_chen.json',
    chatHistory: [
      { sender: 'doctor', text: 'How have your allergy symptoms been since we last spoke?', time: '10:00 AM' },
      { sender: 'patient', text: 'The new antihistamine is working well, less sneezing.', time: '10:05 AM' }
    ],
    soapNote: {
      subjective: 'Patient reports decreased sneezing and itchy eyes.',
      objective: 'Clear nasal passages, no wheezing.',
      assessment: 'Allergic rhinitis, well-controlled.',
      plan: 'Continue current medication. Follow up in 3 months.'
    }
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    age: 45,
    gender: 'Male',
    lastVisit: '2023-10-02',
    diagnosis: 'Mild Hypertension',
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
    jsonReportUrl: '/reports/michael_rodriguez.json',
    chatHistory: [
      { sender: 'patient', text: 'I recorded my BP readings for the week as you asked.', time: '09:00 AM' },
      { sender: 'doctor', text: 'Great, please send them over. Have you experienced any dizziness?', time: '09:12 AM' }
    ],
    soapNote: {
      subjective: 'Patient reports feeling well, no dizziness or headaches.',
      objective: 'BP 130/85. Heart sounds normal.',
      assessment: 'Essential hypertension, mild, stable on current dose.',
      plan: 'Maintain diet and exercise routine. Recheck BP in 1 month.'
    }
  },
  {
    id: 3,
    name: 'Sarah Williams',
    age: 32,
    gender: 'Female',
    lastVisit: '2023-12-05',
    diagnosis: 'Routine Checkup',
    image: 'https://randomuser.me/api/portraits/women/40.jpg',
    jsonReportUrl: '/reports/sarah_williams.json',
    chatHistory: [],
    soapNote: {
      subjective: 'No complaints. Feels healthy.',
      objective: 'Vitals stable. Normal physical exam.',
      assessment: 'Healthy adult female.',
      plan: 'Routine lab work ordered. Annual follow up.'
    }
  }
];

export const initialDoctorAvailability = {
  1: [ // Doctor ID 1
    { date: '2024-03-22', timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM'] },
    { date: '2024-03-24', timeSlots: ['11:00 AM', '01:00 PM', '04:00 PM'] },
  ]
};
