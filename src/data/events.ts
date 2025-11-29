/**
 * Mock data for events in the college event management portal.
 * Updated for Set 1 + Set 2 + Set 3 workflows.
 * 
 * Event Lifecycle:
 * 1. Event Group creates draft event (status: "draft") - visible only in their dashboard
 * 2. Event Group publishes event (status: "upcoming") - visible on public homepage
 * 3. After event ends (status: "ended") - gallery section becomes available
 * 4. Archiver manages archive workflow - cleans, validates, generates summary
 * 5. Archive is finalized (status: "archived") - public can view with summary
 * 
 * Set 3 additions:
 * - Event Group can capture content (photos, videos, audio, text notes)
 * - Event Group can mark faculty attendance
 * - Faculty can view attendance list with flashcards
 * - Faculty can request meetings via mock Outlook draft
 */

// Event status for Set 1 workflow
export type EventStatus = 'draft' | 'upcoming' | 'ended' | 'archived';

// Set 3: Event Group captured media
export interface EventGroupMedia {
  photos: string[];
  videos: string[];
  audio: string[];
  textNotes: string[];
}

// Set 3: Archiver managed media
export interface ArchiverMedia {
  photos: string[];
  videos: string[];
  documents: string[];
}

// Combined media links for events (Set 2 + Set 3 restructured)
export interface MediaLinks {
  // Legacy flat structure for backward compatibility
  photos: string[];
  videos: string[];
  documents?: string[];
  // Set 3: Separated by source
  eventGroup?: EventGroupMedia;
  archiver?: ArchiverMedia;
}

// Set 2: Archival information for ended events
export interface ArchivalInfo {
  uploadWindowExpiresAt?: string;   // ISO timestamp for upload window expiration
  isUploadWindowExpired?: boolean;  // Computed from expiration timestamp
  cleaned?: boolean;                // Whether content has been cleaned (mock AI)
  validated?: boolean;              // Whether content has been validated
  summary?: string;                 // AI-generated summary (mock)
  finalizedAt?: string;             // When archive was finalized
}

// Set 3: Faculty attendance tracking
export interface FacultyAttendance {
  [facultyId: string]: boolean;  // true = attended
}

// Main Event interface for Set 1 + Set 2 + Set 3
export interface Event {
  id: string;
  title: string;
  club: string;              // Which club organizes this event
  dateTime: string;          // ISO datetime string
  type: string;              // Type of event (workshop, talk, competition, etc.)
  shortDescription: string;  // Brief description for cards
  fullDescription?: string;  // Detailed description for event page
  status: EventStatus;       // draft | upcoming | ended | archived
  registrationUrl?: string;  // Generated registration link (for upcoming events)
  mediaLinks?: MediaLinks;   // Photos/videos/documents (for ended/archived events)
  eventGroupId: string;      // Which event group owns this event
  imageUrl?: string;         // Optional cover image
  venue?: string;            // Event location
  lastUpdated: string;       // Last modification date
  archival?: ArchivalInfo;   // Set 2: Archival workflow data
  facultyAttendance?: FacultyAttendance;  // Set 3: Faculty attendance tracking
}

// Available clubs for filtering and selection
export const clubs = [
  'Robotics Club',
  'Coding Club',
  'AI/ML Club',
  'Cultural Committee',
  'Sports Committee',
  'Photography Club',
  'Music Club',
  'Drama Club',
  'Literary Club',
  'Entrepreneurship Cell',
  'IEEE Student Branch',
  'ACM Chapter',
];

// Event types for filtering and selection
export const eventTypes = [
  'Workshop',
  'Talk',
  'Competition',
  'Hackathon',
  'Cultural Event',
  'Sports Event',
  'Seminar',
  'Guest Lecture',
  'Exhibition',
  'Festival',
  'Meetup',
  'Training',
];

// Event Group IDs (simulating different event groups for different clubs)
export const eventGroups = [
  { id: 'eg-robotics', name: 'Robotics Club Event Group', club: 'Robotics Club' },
  { id: 'eg-coding', name: 'Coding Club Event Group', club: 'Coding Club' },
  { id: 'eg-aiml', name: 'AI/ML Club Event Group', club: 'AI/ML Club' },
  { id: 'eg-cultural', name: 'Cultural Committee Event Group', club: 'Cultural Committee' },
  { id: 'eg-sports', name: 'Sports Committee Event Group', club: 'Sports Committee' },
  { id: 'eg-photo', name: 'Photography Club Event Group', club: 'Photography Club' },
];

// Mock events data
export const initialEvents: Event[] = [
  // UPCOMING EVENTS (published, visible on homepage)
  {
    id: '1',
    title: 'RoboWars 2025',
    club: 'Robotics Club',
    dateTime: '2025-12-15T09:00:00',
    type: 'Competition',
    shortDescription: 'Annual robot combat competition featuring teams from across the country.',
    fullDescription: 'RoboWars 2025 is our flagship annual robot combat competition. Teams will compete in various weight categories, showcasing their engineering prowess. Categories include: Lightweight Bots, Heavyweight Bots, and Autonomous Navigation Challenge. Prizes worth ₹1,00,000 to be won!',
    status: 'upcoming',
    registrationUrl: 'https://forms.example.com/robowars2025',
    eventGroupId: 'eg-robotics',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    venue: 'Main Ground & Tech Block',
    lastUpdated: '2025-11-25',
  },
  {
    id: '2',
    title: 'AI/ML Workshop Series',
    club: 'AI/ML Club',
    dateTime: '2025-12-05T10:00:00',
    type: 'Workshop',
    shortDescription: 'Hands-on workshop covering ML fundamentals, neural networks, and practical applications.',
    fullDescription: 'A comprehensive 3-day workshop series covering: Day 1 - Python for ML & Data Preprocessing, Day 2 - Neural Networks & Deep Learning basics, Day 3 - Hands-on project building a real ML model. Prerequisites: Basic Python knowledge. Laptops required.',
    status: 'upcoming',
    registrationUrl: 'https://forms.example.com/aiml-workshop',
    eventGroupId: 'eg-aiml',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    venue: 'Computer Lab 3',
    lastUpdated: '2025-11-20',
  },
  {
    id: '3',
    title: 'Code Sprint 2025',
    club: 'Coding Club',
    dateTime: '2025-12-10T14:00:00',
    type: 'Hackathon',
    shortDescription: '24-hour coding marathon with exciting problem statements and amazing prizes.',
    fullDescription: 'Code Sprint is our annual hackathon bringing together the brightest minds. This year\'s themes: Sustainable Tech, Healthcare Innovation, and EdTech Solutions. Form teams of 2-4 members. Mentorship from industry professionals throughout the event.',
    status: 'upcoming',
    registrationUrl: 'https://forms.example.com/codesprint2025',
    eventGroupId: 'eg-coding',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    venue: 'Innovation Hub',
    lastUpdated: '2025-11-22',
  },
  {
    id: '4',
    title: 'Cultural Night - Resonance',
    club: 'Cultural Committee',
    dateTime: '2025-12-20T18:00:00',
    type: 'Cultural Event',
    shortDescription: 'An evening of music, dance, and theatrical performances.',
    fullDescription: 'Resonance brings together the finest talent from across campus. Performances include: Classical dance, Western band performances, Stand-up comedy, Theatrical drama, and a surprise celebrity performance. Open to all!',
    status: 'upcoming',
    eventGroupId: 'eg-cultural',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    venue: 'Open Air Theatre',
    lastUpdated: '2025-11-28',
  },
  {
    id: '5',
    title: 'Tech Talk: Future of Web Development',
    club: 'Coding Club',
    dateTime: '2025-12-08T15:00:00',
    type: 'Talk',
    shortDescription: 'Industry expert shares insights on emerging web technologies and career paths.',
    fullDescription: 'Join us for an insightful session with Mr. Arun Sharma, Senior Engineer at Google, as he discusses: Modern JavaScript frameworks, Web3 and decentralized apps, Career opportunities in web development, and Q&A session.',
    status: 'upcoming',
    registrationUrl: 'https://forms.example.com/techtalk-web',
    eventGroupId: 'eg-coding',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
    venue: 'Seminar Hall A',
    lastUpdated: '2025-11-18',
  },

  // ENDED EVENTS (past events with gallery)
  {
    id: '6',
    title: 'Photography Walk 2024',
    club: 'Photography Club',
    dateTime: '2024-10-15T07:00:00',
    type: 'Workshop',
    shortDescription: 'Morning photography walk capturing campus beauty.',
    fullDescription: 'A serene morning walk around campus capturing the golden hour. Participants learned about composition, lighting, and storytelling through photos.',
    status: 'archived',
    eventGroupId: 'eg-photo',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=250&fit=crop',
    venue: 'Campus Wide',
    mediaLinks: {
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
      ],
      videos: [],
      documents: [
        'https://example.com/docs/photography-walk-guide.pdf',
      ],
      // Set 3: Event Group captured content
      eventGroup: {
        photos: [
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
          'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
        ],
        videos: [],
        audio: ['https://example.com/audio/photography-tips.mp3'],
        textNotes: ['Great turnout! 35 participants joined the early morning session.', 'Weather was perfect for golden hour shots.'],
      },
    },
    archival: {
      uploadWindowExpiresAt: '2024-10-25T23:59:59',
      isUploadWindowExpired: true,
      cleaned: true,
      validated: true,
      summary: 'The Photography Walk 2024 was a successful morning event where 35 participants explored the campus during golden hour. Key highlights included a photography basics workshop, hands-on guidance on composition and lighting, and a community photo review session. The event captured beautiful moments of campus life and nature.',
      finalizedAt: '2024-10-28',
    },
    // Set 3: Faculty attendance
    facultyAttendance: {
      'fac-001': true,
      'fac-003': true,
      'fac-005': false,
    },
    lastUpdated: '2024-10-28',
  },
  {
    id: '7',
    title: 'Hackathon 2024',
    club: 'Coding Club',
    dateTime: '2024-09-20T09:00:00',
    type: 'Hackathon',
    shortDescription: '24-hour coding marathon that brought together brilliant minds.',
    fullDescription: 'Hackathon 2024 was a massive success with 50+ teams participating. Winning projects included an AI-powered accessibility tool and a sustainable farming app.',
    status: 'ended',
    eventGroupId: 'eg-coding',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    venue: 'Tech Block',
    mediaLinks: {
      photos: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      ],
      videos: [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      ],
      documents: [],
      // Set 3: Event Group captured content
      eventGroup: {
        photos: [
          'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800',
        ],
        videos: ['https://www.youtube.com/watch?v=sample-hackathon'],
        audio: [],
        textNotes: ['50+ teams participated', 'Winners: AI accessibility tool by Team Alpha', 'Second place: Sustainable farming app by Team Green'],
      },
    },
    archival: {
      uploadWindowExpiresAt: '2025-12-15T23:59:59',
      isUploadWindowExpired: false,
      cleaned: false,
      validated: false,
    },
    // Set 3: Faculty attendance
    facultyAttendance: {
      'fac-002': true,
      'fac-004': true,
      'fac-001': false,
      'fac-006': true,
    },
    lastUpdated: '2024-09-25',
  },
  {
    id: '8',
    title: 'Annual Sports Day 2024',
    club: 'Sports Committee',
    dateTime: '2024-11-10T08:00:00',
    type: 'Sports Event',
    shortDescription: 'A day of athletic competitions and team sports.',
    fullDescription: 'Annual Sports Day featured track and field events, team sports like football and cricket, and culminated in a prize distribution ceremony.',
    status: 'ended',
    eventGroupId: 'eg-sports',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
    venue: 'Sports Ground',
    mediaLinks: {
      photos: [
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
      ],
      videos: [],
    },
    lastUpdated: '2024-11-15',
  },

  // DRAFT EVENTS (only visible to Event Group in dashboard)
  {
    id: '9',
    title: 'Drone Racing Championship',
    club: 'Robotics Club',
    dateTime: '2026-01-20T10:00:00',
    type: 'Competition',
    shortDescription: 'First-ever drone racing event on campus.',
    fullDescription: 'Get ready for high-speed drone action! Participants will navigate custom-built drones through obstacle courses. Multiple categories for beginners and experts.',
    status: 'draft',
    eventGroupId: 'eg-robotics',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop',
    venue: 'Main Ground',
    lastUpdated: '2025-11-28',
  },
  {
    id: '10',
    title: 'Python Bootcamp for Beginners',
    club: 'Coding Club',
    dateTime: '2026-01-05T09:00:00',
    type: 'Workshop',
    shortDescription: 'Comprehensive Python course for absolute beginners.',
    fullDescription: 'A week-long bootcamp covering Python basics, data structures, OOP concepts, and a mini-project. Perfect for first-year students.',
    status: 'draft',
    eventGroupId: 'eg-coding',
    venue: 'Computer Lab 1',
    lastUpdated: '2025-11-27',
  },
];

// Helper functions

/**
 * Get all published (upcoming) events for public homepage
 */
export const getUpcomingEvents = (events: Event[]) => {
  return events
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
};

/**
 * Get all ended events
 */
export const getEndedEvents = (events: Event[]) => {
  return events
    .filter((e) => e.status === 'ended')
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
};

/**
 * Get events by event group ID (for dashboard)
 */
export const getEventsByEventGroup = (events: Event[], eventGroupId: string) => {
  return events.filter((e) => e.eventGroupId === eventGroupId);
};

/**
 * Get event by ID
 */
export const getEventById = (events: Event[], id: string) => {
  return events.find((e) => e.id === id);
};

/**
 * Filter events by club, type, and date range
 */
export const filterEvents = (
  events: Event[],
  filters: {
    club?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    searchQuery?: string;
  }
) => {
  return events.filter((event) => {
    // Only show upcoming and ended events on public page (not drafts)
    if (event.status === 'draft') return false;

    // Club filter
    if (filters.club && event.club !== filters.club) return false;

    // Type filter
    if (filters.type && event.type !== filters.type) return false;

    // Date range filter
    if (filters.dateFrom) {
      const eventDate = new Date(event.dateTime);
      const fromDate = new Date(filters.dateFrom);
      if (eventDate < fromDate) return false;
    }
    if (filters.dateTo) {
      const eventDate = new Date(event.dateTime);
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59);
      if (eventDate > toDate) return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = event.title.toLowerCase().includes(query);
      const matchesDescription = event.shortDescription.toLowerCase().includes(query);
      const matchesClub = event.club.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription && !matchesClub) return false;
    }

    return true;
  });
};

/**
 * Generate a dummy registration URL
 */
export const generateRegistrationUrl = (eventId: string, eventTitle: string) => {
  const slug = eventTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `https://register.eventportal.edu/${slug}-${eventId}`;
};

// =====================
// Set 2: Archiver Helpers
// =====================

/**
 * Get all archived events
 */
export const getArchivedEvents = (events: Event[]) => {
  return events
    .filter((e) => e.status === 'archived')
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
};

/**
 * Get events that need archival work (ended but not yet archived)
 */
export const getEventsForArchival = (events: Event[]) => {
  return events
    .filter((e) => e.status === 'ended')
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
};

/**
 * Check if upload window is expired for an event
 */
export const isUploadWindowExpired = (event: Event): boolean => {
  if (!event.archival?.uploadWindowExpiresAt) return false;
  return new Date(event.archival.uploadWindowExpiresAt) < new Date();
};

/**
 * Generate upload link for an event (mock)
 */
export const generateUploadLink = (eventId: string, eventTitle: string) => {
  const slug = eventTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `https://upload.eventportal.edu/${slug}-${eventId}`;
};

/**
 * Generate a mock AI summary for an event
 */
export const generateMockSummary = (event: Event): string => {
  const mediaCount = (event.mediaLinks?.photos?.length || 0) + (event.mediaLinks?.videos?.length || 0);
  return `${event.title} was a successful ${event.type.toLowerCase()} organized by ${event.club}. The event took place at ${event.venue || 'the campus'} and featured various engaging activities. A total of ${mediaCount} media items were captured during the event. Participants had an enriching experience with valuable takeaways and memorable moments. The event showcased the vibrant culture and spirit of our college community.`;
};
