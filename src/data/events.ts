/**
 * Mock data for events in the college event management portal.
 * Updated for Set 1 + Set 2 + Set 3 + Set 4 workflows.
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
 * 
 * Set 4 additions:
 * - Demo event with mixed relevant/irrelevant content
 * - Raw text notes, cleaned text notes, 20-line summary
 * - Upload window "Close Now" functionality
 * - Click-to-open faculty flashcards (instead of hover)
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

// Combined media links for events (Set 2 + Set 3 + Set 4 restructured)
export interface MediaLinks {
  // Legacy flat structure for backward compatibility
  photos: string[];
  videos: string[];
  documents?: string[];
  // Set 3: Separated by source
  eventGroup?: EventGroupMedia;
  archiver?: ArchiverMedia;
  // Set 4: Raw and cleaned text notes for archival workflow
  rawTextNotes?: string[];      // List of long paragraphs (relevant + irrelevant)
  cleanedTextNotes?: string[];  // After "clean" step - only relevant content
  summary20Lines?: string;      // Generated summary (~20 lines) after summary step
}

// Set 2: Archival information for ended events
export interface ArchivalInfo {
  uploadWindowExpiresAt?: string;   // ISO timestamp for upload window expiration
  isUploadWindowExpired?: boolean;  // Computed from expiration timestamp OR manual close
  cleaned?: boolean;                // Whether content has been cleaned (mock AI)
  validated?: boolean;              // Whether content has been validated
  summary?: string;                 // AI-generated summary (mock)
  finalizedAt?: string;             // When archive was finalized
  closedManually?: boolean;         // Set 4: Whether upload window was closed via "Close Now"
}

// Set 3: Faculty attendance tracking
export interface FacultyAttendance {
  [facultyId: string]: boolean;  // true = attended
}

// Main Event interface for Set 1 + Set 2 + Set 3 + Set 4
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

  // SET 4: DEMO EVENT - Hardcoded event for archival workflow demonstration
  // Contains mixed relevant/irrelevant content for cleaning demonstration
  {
    id: 'demo-event-1',
    title: 'AI Innovation Summit 2024 - Demo Event',
    club: 'AI/ML Club',
    dateTime: '2024-11-20T09:00:00',
    type: 'Seminar',
    shortDescription: 'A comprehensive AI summit featuring talks, workshops, and networking. This is a demo event for archival workflow.',
    fullDescription: 'The AI Innovation Summit 2024 brought together industry leaders, researchers, and students to explore the latest trends in artificial intelligence. The event featured keynote speeches, hands-on workshops, panel discussions, and networking sessions. Topics covered included Large Language Models, Computer Vision, Responsible AI, and Career Opportunities in AI.',
    status: 'ended',
    eventGroupId: 'eg-aiml',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    venue: 'Main Auditorium & Tech Labs',
    mediaLinks: {
      // Legacy flat structure
      photos: [
        // Relevant photos
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', // Conference setting
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', // Event audience
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', // Tech presentation
        // Irrelevant photos (for cleaning demo)
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800', // Random cat
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', // Random food
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800', // Random portrait
      ],
      videos: [
        // Relevant videos
        'https://www.youtube.com/watch?v=demo-keynote-speech',
        'https://www.youtube.com/watch?v=demo-workshop-recording',
        // Irrelevant videos (for cleaning demo)
        'https://www.youtube.com/watch?v=random-music-video',
        'https://www.youtube.com/watch?v=random-gameplay',
      ],
      documents: [
        'https://example.com/docs/ai-summit-agenda.pdf',
        'https://example.com/docs/speaker-presentations.zip',
      ],
      // Set 3: Event Group captured content
      eventGroup: {
        photos: [
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', // Workshop session
          'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800', // Networking
        ],
        videos: ['https://www.youtube.com/watch?v=event-group-highlights'],
        audio: ['https://example.com/audio/panel-discussion.mp3'],
        textNotes: [
          'Opening ceremony started at 9:00 AM sharp with over 500 attendees.',
          'Dr. Sharma\'s keynote on LLMs was the highlight of the morning session.',
        ],
      },
      // Set 4: Raw text notes for archival workflow demo (10-12 paragraphs, mixed relevant/irrelevant)
      rawTextNotes: [
        // Relevant paragraph 1
        'The AI Innovation Summit 2024 commenced with an inspiring opening ceremony. The event saw participation from over 500 students, 50 faculty members, and 20 industry professionals. The Vice Chancellor delivered the welcome address, emphasizing the importance of AI in shaping the future of education and industry.',
        
        // Relevant paragraph 2
        'Dr. Priya Sharma from Google Research delivered the keynote speech on "The Future of Large Language Models". She discussed the evolution from GPT-3 to GPT-4 and beyond, highlighting the potential applications in healthcare, education, and scientific research. The audience was particularly engaged during the Q&A session.',
        
        // Irrelevant paragraph 3 (Lorem ipsum)
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
        
        // Relevant paragraph 4
        'The hands-on workshop session on Computer Vision attracted significant interest. Participants learned to build image classification models using PyTorch and TensorFlow. The workshop included practical exercises on object detection and facial recognition, with real-world datasets provided for experimentation.',
        
        // Irrelevant paragraph 5 (Random text)
        'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz.',
        
        // Relevant paragraph 6
        'A panel discussion on "Responsible AI and Ethics" featured experts from academia and industry. Key topics included bias in AI systems, privacy concerns, and the need for transparent algorithms. The panelists agreed that ethical considerations must be integrated into AI development from the ground up.',
        
        // Relevant paragraph 7
        'The networking lunch provided an excellent opportunity for students to interact with industry professionals. Several students received internship offers on the spot. Companies like TCS, Infosys, and startups like AI4Good were actively recruiting.',
        
        // Irrelevant paragraph 8 (Unrelated content)
        'Yesterday I went to the grocery store and bought some apples, oranges, and bananas. The weather was nice so I decided to walk instead of taking the bus. On my way back, I saw a beautiful rainbow in the sky. It reminded me of my childhood when I used to chase rainbows.',
        
        // Relevant paragraph 9
        'The afternoon session featured a startup showcase where 10 AI-focused startups presented their innovations. Notable presentations included an AI-powered medical diagnosis tool, a smart agriculture monitoring system, and an automated content moderation platform. Three startups received seed funding commitments.',
        
        // Relevant paragraph 10
        'Professor Rajesh Kumar conducted a session on "Career Paths in AI/ML". He outlined various roles including ML Engineer, Data Scientist, AI Researcher, and AI Ethics Consultant. Students received guidance on required skills, certifications, and recommended learning paths.',
        
        // Irrelevant paragraph 11 (Test data)
        'Test test test. This is a test paragraph that should be removed during cleaning. AAAA BBBB CCCC DDDD. 1234567890. Random characters: @#$%^&*(). This content has no relevance to the AI Summit event whatsoever.',
        
        // Relevant paragraph 12
        'The closing ceremony recognized outstanding contributions. Best Paper Award went to the team from Computer Science department for their work on federated learning. The event concluded with a commitment to make the AI Summit an annual tradition, with next year\'s theme announced as "AI for Social Good".',
      ],
      // These will be populated after cleaning (initially empty)
      cleanedTextNotes: [],
      summary20Lines: '',
    },
    archival: {
      uploadWindowExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      isUploadWindowExpired: false,
      cleaned: false,
      validated: false,
    },
    // Faculty attendance for demo
    facultyAttendance: {
      'fac-001': true,  // Dr. Priya Sharma
      'fac-002': true,  // Dr. Rajesh Kumar
      'fac-003': true,  // Dr. Anita Desai
      'fac-004': false,
      'fac-005': true,  // Dr. Kavitha Nair
      'fac-006': true,  // Dr. Suresh Menon
    },
    lastUpdated: '2024-11-25',
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
