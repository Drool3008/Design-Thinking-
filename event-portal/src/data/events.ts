/**
 * Mock data for events in the college event management portal.
 * This file contains sample events with various statuses, departments, and categories.
 */

export type EventStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Completed';

export interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  category: string;
  date: string; // ISO date string
  time: string;
  venue: string;
  capacity: number;
  status: EventStatus;
  organiserGroup: string;
  facultyInCharge: string;
  isArchived: boolean;
  imageUrl: string;
  tags: string[];
  lastUpdated: string;
  registrationLink?: string;
}

// Categories for filtering
export const categories = [
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Seminar',
  'Competition',
  'Festival',
  'Guest Lecture',
];

// Departments for filtering
export const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Mathematics',
  'Physics',
  'Student Council',
  'Cultural Committee',
];

// Mock events data
export const events: Event[] = [
  {
    id: '1',
    title: 'TechFest 2025',
    description: 'Annual technical festival featuring hackathons, coding competitions, robotics challenges, and tech talks from industry experts. Join us for three days of innovation and learning!',
    department: 'Computer Science',
    category: 'Festival',
    date: '2025-12-15',
    time: '09:00',
    venue: 'Main Auditorium & Tech Block',
    capacity: 500,
    status: 'Approved',
    organiserGroup: 'Tech Club',
    facultyInCharge: 'Dr. Rajesh Kumar',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    tags: ['hackathon', 'coding', 'robotics', 'tech'],
    lastUpdated: '2025-11-25',
    registrationLink: 'https://example.com/register',
  },
  {
    id: '2',
    title: 'AI/ML Workshop',
    description: 'Hands-on workshop on Machine Learning fundamentals, neural networks, and practical applications using Python and TensorFlow. Perfect for beginners and intermediate learners.',
    department: 'Computer Science',
    category: 'Workshop',
    date: '2025-12-05',
    time: '10:00',
    venue: 'Computer Lab 3',
    capacity: 60,
    status: 'Approved',
    organiserGroup: 'AI Club',
    facultyInCharge: 'Dr. Priya Sharma',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    tags: ['AI', 'machine learning', 'python', 'workshop'],
    lastUpdated: '2025-11-20',
    registrationLink: 'https://example.com/register',
  },
  {
    id: '3',
    title: 'Cultural Night - Resonance',
    description: 'An evening of music, dance, and theatrical performances showcasing the diverse talents of our students. Features classical and contemporary performances.',
    department: 'Cultural Committee',
    category: 'Cultural',
    date: '2025-12-20',
    time: '18:00',
    venue: 'Open Air Theatre',
    capacity: 800,
    status: 'Pending Approval',
    organiserGroup: 'Cultural Committee',
    facultyInCharge: 'Prof. Anita Desai',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    tags: ['music', 'dance', 'cultural', 'performance'],
    lastUpdated: '2025-11-28',
  },
  {
    id: '4',
    title: 'Inter-College Basketball Tournament',
    description: 'Annual inter-college basketball championship featuring teams from top engineering colleges. Three days of intense competition and sportsmanship.',
    department: 'Student Council',
    category: 'Sports',
    date: '2025-12-10',
    time: '08:00',
    venue: 'Sports Complex',
    capacity: 200,
    status: 'Approved',
    organiserGroup: 'Sports Committee',
    facultyInCharge: 'Mr. Vikram Singh',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
    tags: ['basketball', 'sports', 'tournament', 'inter-college'],
    lastUpdated: '2025-11-22',
    registrationLink: 'https://example.com/register',
  },
  {
    id: '5',
    title: 'Guest Lecture: Future of Quantum Computing',
    description: 'Distinguished lecture by Dr. Sarah Chen from IBM Research on the current state and future prospects of quantum computing and its applications.',
    department: 'Physics',
    category: 'Guest Lecture',
    date: '2025-12-08',
    time: '14:00',
    venue: 'Seminar Hall A',
    capacity: 150,
    status: 'Approved',
    organiserGroup: 'Physics Society',
    facultyInCharge: 'Dr. Amit Verma',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    tags: ['quantum', 'physics', 'lecture', 'research'],
    lastUpdated: '2025-11-18',
  },
  {
    id: '6',
    title: 'Startup Pitch Competition',
    description: 'Present your startup ideas to a panel of investors and industry mentors. Top three teams win seed funding and incubation support.',
    department: 'Student Council',
    category: 'Competition',
    date: '2025-12-12',
    time: '11:00',
    venue: 'Innovation Hub',
    capacity: 100,
    status: 'Pending Approval',
    organiserGroup: 'E-Cell',
    facultyInCharge: 'Dr. Meera Patel',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
    tags: ['startup', 'entrepreneurship', 'pitch', 'innovation'],
    lastUpdated: '2025-11-26',
  },
  {
    id: '7',
    title: 'Web Development Bootcamp',
    description: 'Intensive 2-day bootcamp covering modern web development with React, Node.js, and cloud deployment. Build a full-stack project by the end!',
    department: 'Computer Science',
    category: 'Workshop',
    date: '2025-12-18',
    time: '09:00',
    venue: 'Computer Lab 1 & 2',
    capacity: 40,
    status: 'Draft',
    organiserGroup: 'Web Dev Club',
    facultyInCharge: 'Dr. Rahul Mehta',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    tags: ['web', 'react', 'nodejs', 'fullstack'],
    lastUpdated: '2025-11-27',
  },
  {
    id: '8',
    title: 'Robotics Exhibition',
    description: 'Showcase of student-built robots and autonomous systems. Interactive demonstrations and live robot battles!',
    department: 'Mechanical',
    category: 'Technical',
    date: '2025-12-22',
    time: '10:00',
    venue: 'Exhibition Hall',
    capacity: 300,
    status: 'Pending Approval',
    organiserGroup: 'Robotics Club',
    facultyInCharge: 'Dr. Suresh Nair',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    tags: ['robotics', 'exhibition', 'automation', 'AI'],
    lastUpdated: '2025-11-24',
  },
  {
    id: '9',
    title: 'Mathematics Olympiad',
    description: 'Annual mathematics competition for problem-solving enthusiasts. Multiple rounds testing analytical and mathematical skills.',
    department: 'Mathematics',
    category: 'Competition',
    date: '2025-12-06',
    time: '09:30',
    venue: 'Examination Hall',
    capacity: 200,
    status: 'Approved',
    organiserGroup: 'Math Club',
    facultyInCharge: 'Prof. Lakshmi Iyer',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    tags: ['mathematics', 'olympiad', 'problem-solving'],
    lastUpdated: '2025-11-15',
    registrationLink: 'https://example.com/register',
  },
  {
    id: '10',
    title: 'Photography Workshop',
    description: 'Learn photography basics, composition techniques, and photo editing. Bring your camera or smartphone!',
    department: 'Cultural Committee',
    category: 'Workshop',
    date: '2025-12-14',
    time: '15:00',
    venue: 'Art Studio',
    capacity: 30,
    status: 'Approved',
    organiserGroup: 'Photography Club',
    facultyInCharge: 'Ms. Kavita Reddy',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=250&fit=crop',
    tags: ['photography', 'creative', 'art', 'workshop'],
    lastUpdated: '2025-11-19',
  },
  // Past/Archived events
  {
    id: '11',
    title: 'Hackathon 2024',
    description: '24-hour coding marathon that brought together the best minds to solve real-world problems.',
    department: 'Computer Science',
    category: 'Competition',
    date: '2024-10-15',
    time: '09:00',
    venue: 'Tech Block',
    capacity: 200,
    status: 'Completed',
    organiserGroup: 'Tech Club',
    facultyInCharge: 'Dr. Rajesh Kumar',
    isArchived: true,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    tags: ['hackathon', 'coding', 'competition'],
    lastUpdated: '2024-10-20',
  },
  {
    id: '12',
    title: 'Annual Sports Day 2024',
    description: 'A day filled with athletic competitions, team sports, and celebration of sportsmanship.',
    department: 'Student Council',
    category: 'Sports',
    date: '2024-09-20',
    time: '07:00',
    venue: 'Sports Ground',
    capacity: 1000,
    status: 'Completed',
    organiserGroup: 'Sports Committee',
    facultyInCharge: 'Mr. Vikram Singh',
    isArchived: true,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices-athletes?w=400&h=250&fit=crop',
    tags: ['sports', 'athletics', 'annual'],
    lastUpdated: '2024-09-25',
  },
  {
    id: '13',
    title: 'Cultural Fest - Tarang 2024',
    description: 'Three-day cultural extravaganza featuring music, dance, drama, and art exhibitions.',
    department: 'Cultural Committee',
    category: 'Festival',
    date: '2024-11-10',
    time: '10:00',
    venue: 'Campus Wide',
    capacity: 2000,
    status: 'Completed',
    organiserGroup: 'Cultural Committee',
    facultyInCharge: 'Prof. Anita Desai',
    isArchived: false,
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
    tags: ['cultural', 'festival', 'music', 'dance'],
    lastUpdated: '2024-11-15',
  },
];

// Helper functions for filtering events
export const getUpcomingEvents = () => {
  const today = new Date().toISOString().split('T')[0];
  return events.filter(e => e.date >= today && !e.isArchived).sort((a, b) => a.date.localeCompare(b.date));
};

export const getPastEvents = () => {
  const today = new Date().toISOString().split('T')[0];
  return events.filter(e => e.date < today || e.status === 'Completed');
};

export const getArchivedEvents = () => {
  return events.filter(e => e.isArchived);
};

export const getEventsByStatus = (status: EventStatus) => {
  return events.filter(e => e.status === status);
};

export const getEventsByDepartment = (department: string) => {
  return events.filter(e => e.department === department);
};

export const getEventsByCategory = (category: string) => {
  return events.filter(e => e.category === category);
};

export const getEventById = (id: string) => {
  return events.find(e => e.id === id);
};

export const getRelatedEvents = (event: Event) => {
  return events
    .filter(e => 
      e.id !== event.id && 
      !e.isArchived &&
      (e.category === event.category || e.department === event.department)
    )
    .slice(0, 4);
};
