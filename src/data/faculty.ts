/**
 * Faculty mock data for the college event management portal.
 * Set 3: Faculty information for attendance tracking and flashcards.
 * 
 * Features:
 * - Faculty attendance can be marked by Event Groups
 * - Faculty can view attendance lists with hoverable flashcards
 * - Faculty can request meetings with other faculty via mock Outlook draft
 */

// Faculty member interface
export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  interests: string[];
  lab: string;
  email: string;
  linkedinUrl?: string;
  homepageUrl?: string;
  photoUrl?: string;
}

// Mock faculty data
export const facultyMembers: Faculty[] = [
  {
    id: 'fac-001',
    name: 'Dr. Priya Sharma',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    interests: ['Machine Learning', 'Computer Vision', 'Deep Learning'],
    lab: 'AI Research Lab',
    email: 'priya.sharma@university.edu',
    linkedinUrl: 'https://linkedin.com/in/priyasharma',
    homepageUrl: 'https://faculty.university.edu/psharma',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-002',
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science & Engineering',
    designation: 'Professor',
    interests: ['Distributed Systems', 'Cloud Computing', 'System Security'],
    lab: 'Systems & Security Lab',
    email: 'rajesh.kumar@university.edu',
    linkedinUrl: 'https://linkedin.com/in/rajeshkumar',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-003',
    name: 'Dr. Ananya Gupta',
    department: 'Electronics & Communication',
    designation: 'Assistant Professor',
    interests: ['Signal Processing', 'IoT', 'Embedded Systems'],
    lab: 'IoT & Embedded Systems Lab',
    email: 'ananya.gupta@university.edu',
    linkedinUrl: 'https://linkedin.com/in/ananyagupta',
    homepageUrl: 'https://faculty.university.edu/agupta',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-004',
    name: 'Dr. Vikram Mehta',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    interests: ['Natural Language Processing', 'Information Retrieval', 'Text Mining'],
    lab: 'NLP Research Group',
    email: 'vikram.mehta@university.edu',
    linkedinUrl: 'https://linkedin.com/in/vikrammehta',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-005',
    name: 'Dr. Sunita Patel',
    department: 'Mathematics',
    designation: 'Professor',
    interests: ['Applied Mathematics', 'Optimization', 'Statistical Modeling'],
    lab: 'Computational Mathematics Lab',
    email: 'sunita.patel@university.edu',
    homepageUrl: 'https://faculty.university.edu/spatel',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-006',
    name: 'Dr. Arjun Nair',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    interests: ['Human-Computer Interaction', 'UI/UX Research', 'Accessibility'],
    lab: 'HCI & Design Lab',
    email: 'arjun.nair@university.edu',
    linkedinUrl: 'https://linkedin.com/in/arjunnair',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-007',
    name: 'Dr. Meera Krishnan',
    department: 'Electronics & Communication',
    designation: 'Professor',
    interests: ['VLSI Design', 'Digital Systems', 'Hardware Security'],
    lab: 'VLSI Design Lab',
    email: 'meera.krishnan@university.edu',
    linkedinUrl: 'https://linkedin.com/in/meerakrishnan',
    homepageUrl: 'https://faculty.university.edu/mkrishnan',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'fac-008',
    name: 'Dr. Sanjay Verma',
    department: 'Information Technology',
    designation: 'Associate Professor',
    interests: ['Cybersecurity', 'Network Security', 'Cryptography'],
    lab: 'Cybersecurity Research Center',
    email: 'sanjay.verma@university.edu',
    linkedinUrl: 'https://linkedin.com/in/sanjayverma',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
  },
];

// Helper function to get faculty by ID
export const getFacultyById = (id: string): Faculty | undefined => {
  return facultyMembers.find(f => f.id === id);
};

// Helper function to get multiple faculty by IDs
export const getFacultyByIds = (ids: string[]): Faculty[] => {
  return facultyMembers.filter(f => ids.includes(f.id));
};

// Helper function to get all faculty
export const getAllFaculty = (): Faculty[] => {
  return facultyMembers;
};

// Helper function to search faculty by name or department
export const searchFaculty = (query: string): Faculty[] => {
  const lowerQuery = query.toLowerCase();
  return facultyMembers.filter(f => 
    f.name.toLowerCase().includes(lowerQuery) ||
    f.department.toLowerCase().includes(lowerQuery) ||
    f.lab.toLowerCase().includes(lowerQuery)
  );
};

export default facultyMembers;
