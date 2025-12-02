/**
 * Summaries Data - Faculty Summary Widget
 * 
 * Hardcoded summaries keyed by eventId and category.
 * Faculty users can view and download these summaries.
 * 
 * HOW TO ADD/EDIT SUMMARIES:
 * 1. Add entries to the `summariesByEvent` object below
 * 2. Key = eventId (must match event.id from events.ts)
 * 3. Each event can have multiple summaries of different categories
 * 4. Categories: research, lab, eventRecap, mediaHighlights, attendance, studentImpact
 */

// Summary categories available for filtering
export type SummaryCategory =
  | 'research'
  | 'lab'
  | 'eventRecap'
  | 'mediaHighlights'
  | 'attendance'
  | 'studentImpact';

// Display labels for each category
export const categoryLabels: Record<SummaryCategory, string> = {
  research: 'Research Related Summary',
  lab: 'Lab Related Summary',
  eventRecap: 'Event Recap',
  mediaHighlights: 'Media Highlights',
  attendance: 'Attendance Summary',
  studentImpact: 'Student Impact Summary',
};

// Category descriptions for UI
export const categoryDescriptions: Record<SummaryCategory, string> = {
  research: 'Research outcomes, papers, and academic contributions',
  lab: 'Laboratory work, experiments, and technical demonstrations',
  eventRecap: 'Overall event summary with key highlights',
  mediaHighlights: 'Photos, videos, and media coverage',
  attendance: 'Faculty and student attendance details',
  studentImpact: 'Learning outcomes and student feedback',
};

// Individual summary entry interface
export interface SummaryEntry {
  title: string;
  category: SummaryCategory;
  text: string;           // The body text to display in the preview (hardcoded)
  author?: string;        // Who generated/wrote this summary
  generatedAt?: string;   // ISO string for display
  images?: string[];      // Optional preview images/thumbnails
  keyPoints?: string[];   // Optional bullet points for quick scanning
}

// Summaries organized by event ID
export const summariesByEvent: Record<string, SummaryEntry[]> = {
  // Demo Event 1 - AI Innovation Summit (from Set 4)
  'demo-event-1': [
    {
      title: 'Research Outcomes Summary',
      category: 'research',
      text: `# AI Innovation Summit 2024 - Research Summary

## Overview
The AI Innovation Summit 2024 served as a platform for presenting cutting-edge research in artificial intelligence and machine learning. This summary captures the key research outcomes and academic contributions from the event.

## Key Research Presentations

### 1. Large Language Models (LLMs)
Dr. Priya Sharma from Google Research presented groundbreaking work on the evolution of LLMs from GPT-3 to GPT-4 and beyond. Key highlights include:
- Novel attention mechanisms for improved context understanding
- Efficiency improvements reducing computational costs by 40%
- Applications in healthcare diagnostics showing 85% accuracy improvement

### 2. Computer Vision Applications
The computer vision track featured 12 research papers with focus areas including:
- Real-time object detection for autonomous systems
- Medical imaging analysis using transformer architectures
- 3D reconstruction from monocular images

### 3. Responsible AI & Ethics
Panel discussions covered:
- Bias detection and mitigation in ML models
- Explainability frameworks for deep learning
- Privacy-preserving machine learning techniques

## Student Research Contributions
15 student research posters were presented, with 3 receiving awards:
- Best Paper: "Efficient Fine-tuning of Vision Transformers" by Team Alpha
- Innovation Award: "AI-powered Sign Language Translation" by Team Beta
- Impact Award: "Predictive Maintenance using Edge AI" by Team Gamma

## Collaboration Opportunities
The summit facilitated 8 new research collaborations between:
- Industry partners (Google, Microsoft, NVIDIA)
- Academic institutions
- Student research groups

## Publications & Citations
- 5 papers submitted to IEEE conferences
- 3 papers accepted for journal publication
- Estimated 50+ citations expected from presented work

## Next Steps
- Follow-up workshop scheduled for Q1 2025
- Research mentorship program launching
- Collaborative research grants being processed`,
      author: 'Research Committee',
      generatedAt: '2024-11-22T10:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400',
      ],
      keyPoints: [
        'Dr. Priya Sharma keynote on LLMs evolution',
        '12 research papers in Computer Vision',
        '15 student research posters presented',
        '8 new industry-academia collaborations',
        '5 papers submitted to IEEE conferences',
      ],
    },
    {
      title: 'Laboratory Sessions Summary',
      category: 'lab',
      text: `# AI Innovation Summit 2024 - Lab Sessions Report

## Overview
The hands-on laboratory sessions were a highlight of the AI Innovation Summit, providing participants with practical experience in cutting-edge AI technologies.

## Lab Session Details

### Lab 1: Introduction to Transformer Architecture
**Duration:** 2 hours | **Participants:** 45 students

Topics Covered:
- Self-attention mechanism implementation
- Multi-head attention from scratch
- Position encoding techniques
- Building a mini GPT model

**Outcomes:**
- 42 students successfully completed the hands-on exercise
- Average completion time: 1.5 hours
- Post-session quiz average score: 82%

### Lab 2: Computer Vision with PyTorch
**Duration:** 2.5 hours | **Participants:** 38 students

Topics Covered:
- CNN architectures (ResNet, EfficientNet)
- Transfer learning for custom datasets
- Object detection with YOLO
- Image segmentation techniques

**Outcomes:**
- Students trained models achieving 91% validation accuracy
- 5 students extended project for thesis work
- Lab materials published on GitHub (200+ stars)

### Lab 3: Reinforcement Learning Workshop
**Duration:** 3 hours | **Participants:** 25 students

Topics Covered:
- Q-learning fundamentals
- Deep Q-Networks (DQN)
- Policy gradient methods
- Training agents for game environments

**Outcomes:**
- Students built agents for CartPole and LunarLander
- 3 teams proposed RL-based capstone projects
- Industry mentor provided real-world RL insights

## Equipment & Resources Used
- 50 GPU workstations (NVIDIA RTX 3080)
- Cloud compute credits: $2,000 AWS credits utilized
- Jupyter notebooks pre-configured for all participants
- Docker environments for reproducibility

## Feedback Summary
- Overall satisfaction: 4.7/5
- "Best hands-on experience at any college event"
- "The GPU access made a huge difference"
- Request for more advanced sessions in future

## Action Items
- Publish all lab materials on college repository
- Set up recurring ML lab sessions (monthly)
- Explore GPU cluster expansion for student access`,
      author: 'Lab Coordinator',
      generatedAt: '2024-11-22T14:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      ],
      keyPoints: [
        '3 hands-on lab sessions conducted',
        '108 total student participants',
        'Average satisfaction rating: 4.7/5',
        '50 GPU workstations utilized',
        'All materials published on GitHub',
      ],
    },
    {
      title: 'Event Recap - Full Summary',
      category: 'eventRecap',
      text: `# AI Innovation Summit 2024 - Complete Event Recap

## Event Overview
**Date:** November 20, 2024
**Venue:** Main Auditorium & Tech Labs
**Duration:** 9:00 AM - 6:00 PM (Full Day)
**Total Attendees:** 523

## Schedule Highlights

### Morning Session (9:00 AM - 12:30 PM)
- **9:00 AM** - Opening Ceremony with Vice Chancellor
- **9:30 AM** - Keynote: "Future of LLMs" by Dr. Priya Sharma (Google)
- **10:45 AM** - Coffee Break & Networking
- **11:00 AM** - Technical Track A: Research Presentations
- **11:00 AM** - Technical Track B: Industry Applications
- **12:30 PM** - Lunch Break

### Afternoon Session (1:30 PM - 6:00 PM)
- **1:30 PM** - Panel Discussion: "AI Ethics in 2024"
- **2:30 PM** - Hands-on Workshops (3 parallel tracks)
- **4:30 PM** - Student Poster Session
- **5:30 PM** - Awards Ceremony & Closing
- **6:00 PM** - Networking Reception

## Key Achievements
1. Largest AI event in college history
2. 8 industry sponsors secured
3. 3 MoUs signed with tech companies
4. 15 student projects showcased
5. Media coverage in 5 publications

## Participant Breakdown
| Category | Count |
|----------|-------|
| Students | 420 |
| Faculty | 53 |
| Industry | 35 |
| Guests | 15 |

## Memorable Moments
- Standing ovation for Dr. Sharma's keynote
- Student demo of real-time sign language translation
- Surprise announcement of college AI research center
- Industry recruiters expressing interest in 50+ students

## Challenges & Learnings
- Venue capacity slightly exceeded (need larger venue next time)
- Wi-Fi bandwidth issues during workshops (resolved by 11 AM)
- High demand for lab sessions (waitlist for 30 students)

## Success Metrics
- NPS Score: 72 (Excellent)
- Social media reach: 15,000+ impressions
- Event hashtag trending locally
- 95% would recommend to peers

## Next Year Planning
- Venue: Consider convention center
- Duration: Potentially 2-day event
- Budget: Seek additional sponsors
- Scope: Include AI startup showcase`,
      author: 'Event Organizing Committee',
      generatedAt: '2024-11-21T18:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400',
      ],
      keyPoints: [
        '523 total attendees',
        '8 industry sponsors',
        '3 MoUs signed with tech companies',
        'NPS Score: 72 (Excellent)',
        '15,000+ social media impressions',
      ],
    },
    {
      title: 'Media & Photography Highlights',
      category: 'mediaHighlights',
      text: `# AI Innovation Summit 2024 - Media Highlights

## Photography Summary
**Total Photos Captured:** 850+
**Selected for Archive:** 127
**Photographer:** College Photography Club

### Photo Categories
- Opening Ceremony: 45 photos
- Keynote Sessions: 62 photos
- Workshop Sessions: 89 photos
- Networking & Candid: 156 photos
- Awards Ceremony: 38 photos
- Behind the Scenes: 43 photos

### Best Shots
1. Vice Chancellor with Industry Leaders (Opening)
2. Dr. Sharma presenting LLM architecture diagram
3. Students during hands-on workshop
4. Poster session wide-angle shot
5. Award winners group photo

## Video Content

### Recorded Sessions
| Session | Duration | Views |
|---------|----------|-------|
| Opening Ceremony | 45 min | 1,200 |
| Keynote Speech | 60 min | 3,500 |
| Panel Discussion | 50 min | 890 |
| Award Ceremony | 20 min | 650 |

### Highlight Reels
- 5-minute event highlight video (Published on YouTube)
- 1-minute Instagram/LinkedIn teaser
- Behind-the-scenes documentary (15 min)

## Social Media Impact

### Platform Performance
| Platform | Posts | Reach | Engagement |
|----------|-------|-------|------------|
| LinkedIn | 12 | 8,500 | 1,200 |
| Instagram | 25 | 5,200 | 890 |
| Twitter/X | 35 | 3,800 | 420 |
| Facebook | 8 | 2,100 | 180 |

### Top Performing Content
1. Keynote speaker quote graphic (2,100 likes)
2. Student demo video clip (1,800 views)
3. Event announcement carousel (1,500 reach)

## Press Coverage
- College newsletter feature article
- Local newspaper brief mention
- Tech blog post by student journalist
- Alumni association newsletter

## Media Assets Location
All approved media assets are stored in:
- Google Drive: AI_Summit_2024_Media
- College Archive Server: /events/2024/ai-summit
- Social Media Management Tool: Scheduled posts folder

## Usage Guidelines
- Credit: "AI Innovation Summit 2024, [College Name]"
- Release forms collected from all identifiable individuals
- Industry partner logos usage approved for 1 year`,
      author: 'Media Team',
      generatedAt: '2024-11-23T09:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      ],
      keyPoints: [
        '850+ photos captured, 127 selected',
        '4 sessions professionally recorded',
        '15,000+ social media reach',
        'Highlight video published on YouTube',
        'Press coverage in 4 publications',
      ],
    },
    {
      title: 'Faculty & Student Attendance Report',
      category: 'attendance',
      text: `# AI Innovation Summit 2024 - Attendance Report

## Executive Summary
The AI Innovation Summit 2024 achieved record attendance with 523 participants, exceeding our target of 400 by 31%.

## Detailed Attendance Breakdown

### By Category
| Category | Registered | Attended | Rate |
|----------|------------|----------|------|
| Students | 450 | 420 | 93% |
| Faculty | 55 | 53 | 96% |
| Industry | 40 | 35 | 88% |
| VIP Guests | 18 | 15 | 83% |
| **Total** | **563** | **523** | **93%** |

### Student Attendance by Department
| Department | Count | Percentage |
|------------|-------|------------|
| Computer Science | 180 | 43% |
| Electronics | 85 | 20% |
| Information Tech | 72 | 17% |
| Mechanical | 38 | 9% |
| Other | 45 | 11% |

### Faculty Attendance Details
| Department | Faculty Present |
|------------|-----------------|
| CSE | Dr. Kumar, Dr. Patel, Dr. Singh, Prof. Gupta |
| ECE | Dr. Sharma, Prof. Reddy, Dr. Nair |
| IT | Dr. Mehta, Prof. Joshi, Dr. Agarwal |
| Research | Dr. Iyer, Dr. Krishnan |
| Administration | Dean, HoD CSE, HoD ECE |

### Session-wise Attendance
| Session | Time | Attendance |
|---------|------|------------|
| Opening Ceremony | 9:00 AM | 480 |
| Keynote | 9:30 AM | 510 |
| Track A Sessions | 11:00 AM | 250 |
| Track B Sessions | 11:00 AM | 230 |
| Lunch | 12:30 PM | 490 |
| Panel Discussion | 1:30 PM | 420 |
| Lab Session 1 | 2:30 PM | 45 |
| Lab Session 2 | 2:30 PM | 38 |
| Lab Session 3 | 2:30 PM | 25 |
| Poster Session | 4:30 PM | 380 |
| Closing | 5:30 PM | 350 |

## Check-in Statistics
- Early arrivals (before 9 AM): 245
- On-time arrivals (9-9:30 AM): 198
- Late arrivals (after 9:30 AM): 80

## No-Shows Analysis
- Total no-shows: 40
- Reason breakdown (from follow-up):
  - Academic conflict: 18
  - Health reasons: 8
  - Transportation issues: 6
  - Unknown: 8

## Industry Participation
### Companies Represented
- Google (2 representatives)
- Microsoft (2 representatives)
- NVIDIA (1 representative)
- TCS (3 representatives)
- Infosys (2 representatives)
- Local startups (25 representatives)

## Recommendations
1. Increase venue capacity for next event
2. Implement early-bird registration incentives
3. Provide transport for off-campus participants
4. Send reminder notifications 24h before event`,
      author: 'Registration Desk',
      generatedAt: '2024-11-21T20:00:00Z',
      keyPoints: [
        '523 total attendees (93% attendance rate)',
        '53 faculty members present',
        '35 industry professionals attended',
        'Highest attendance: Keynote (510)',
        'CSE department: 43% of students',
      ],
    },
    {
      title: 'Student Learning Outcomes & Impact',
      category: 'studentImpact',
      text: `# AI Innovation Summit 2024 - Student Impact Assessment

## Overview
This report assesses the educational impact and outcomes for students who participated in the AI Innovation Summit 2024.

## Learning Outcomes Survey Results
**Respondents:** 385 students (92% response rate)

### Knowledge Gain (Self-Reported)
| Topic | Before Event | After Event | Improvement |
|-------|--------------|-------------|-------------|
| LLMs Understanding | 3.2/5 | 4.4/5 | +38% |
| Computer Vision | 2.8/5 | 4.1/5 | +46% |
| AI Ethics | 2.5/5 | 4.0/5 | +60% |
| Career Paths in AI | 3.0/5 | 4.5/5 | +50% |

### Skills Developed
- Transformer architecture implementation: 82% of workshop attendees
- PyTorch proficiency improvement: 78%
- Research paper reading ability: 65%
- Networking and presentation skills: 70%

## Academic Impact

### Inspired Projects
- 12 students started AI-related final year projects
- 5 student teams formed for hackathons
- 3 students initiated research assistantships

### Course Enrollment Changes
- 25% increase in AI/ML elective registrations
- 15 students added minor in Data Science
- 8 students changed thesis topics to AI-related areas

## Career Development

### Placement Activities
- 50+ students connected with recruiters
- 12 on-spot interview invitations
- 5 internship offers extended
- 8 students referred for campus placements

### Industry Connections Made
| Connection Type | Count |
|-----------------|-------|
| LinkedIn connections | 200+ |
| Mentor matches | 25 |
| Research collaborations | 8 |
| Project partnerships | 5 |

## Student Testimonials

> "The hands-on workshop changed my perspective on AI. I went from thinking it was scary to feeling empowered to build with it."
> — Rahul, 3rd Year CSE

> "Meeting Dr. Sharma and discussing my research idea was the highlight of my college life so far."
> — Priya, 4th Year ECE

> "The industry panel helped me understand what skills I need for my dream job at a tech company."
> — Amit, 2nd Year IT

## Long-term Impact Indicators
- Student AI club membership: +45% (new members)
- Library AI book checkouts: +60% (following month)
- GitHub activity: 85 new AI-related repos from students
- Study group formations: 12 new AI study groups

## Recommendations for Future Events
1. More hands-on workshop slots
2. Dedicated mentorship matchmaking session
3. Extended networking time
4. Follow-up webinar series
5. Alumni success stories panel

## Success Metrics Summary
| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| Satisfaction | 4.0/5 | 4.7/5 | ✅ Exceeded |
| Learning | 30% | 48% | ✅ Exceeded |
| Career impact | 10 offers | 17 offers | ✅ Exceeded |
| Project inspiration | 5 projects | 12 projects | ✅ Exceeded |`,
      author: 'Student Affairs Office',
      generatedAt: '2024-11-25T11:00:00Z',
      images: [
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400',
      ],
      keyPoints: [
        '92% survey response rate',
        'Average knowledge improvement: 48%',
        '12 new AI-related student projects',
        '17 career opportunities (offers/interviews)',
        '45% increase in AI club membership',
      ],
    },
  ],

  // Event 1 - Robotics Workshop (ended/archived)
  '1': [
    {
      title: 'Event Recap Summary',
      category: 'eventRecap',
      text: `# Robotics Workshop 2024 - Event Recap

## Overview
The Robotics Workshop brought together 75 participants for an intensive hands-on session on robot building and programming.

## Key Highlights
- 8 functional robots built during the workshop
- Introduction to Arduino and Raspberry Pi
- Line-following robot competition
- Expert session by industry robotics engineer

## Outcomes
- 90% participant satisfaction rate
- 15 students expressed interest in robotics club
- 3 student projects initiated for inter-college competition

## Recommendations
- Extend workshop to 2 days for more depth
- Include advanced robotics track next time
- Partner with industry for robot kits sponsorship`,
      author: 'Robotics Club',
      generatedAt: '2024-12-01T10:00:00Z',
      keyPoints: [
        '75 participants attended',
        '8 robots built successfully',
        '90% satisfaction rate',
        '15 new robotics club interests',
      ],
    },
  ],

  // Event 5 - Web Dev Bootcamp (archived)
  '5': [
    {
      title: 'Event Recap Summary',
      category: 'eventRecap',
      text: `# Web Development Bootcamp - Event Recap

## Overview
A comprehensive bootcamp covering modern web development with React, Node.js, and deployment best practices.

## Sessions Conducted
1. HTML/CSS Fundamentals (2 hours)
2. JavaScript ES6+ (2 hours)
3. React Basics (3 hours)
4. Node.js & Express (2 hours)
5. Deployment with Vercel (1 hour)

## Participant Outcomes
- 45 students completed all modules
- 30 students deployed their first web app
- Average project completion rate: 85%

## Notable Projects
- E-commerce landing page
- Weather dashboard
- Personal portfolio sites
- Todo application with backend`,
      author: 'Coding Club',
      generatedAt: '2024-11-28T15:00:00Z',
      keyPoints: [
        '45 students completed bootcamp',
        '30 web apps deployed',
        '85% project completion rate',
        '5 hands-on sessions conducted',
      ],
    },
    {
      title: 'Attendance Summary',
      category: 'attendance',
      text: `# Web Development Bootcamp - Attendance Report

## Registration vs Attendance
- Registered: 60 students
- Day 1 Attendance: 55 students
- Day 2 Attendance: 48 students
- Full completion: 45 students

## Department Breakdown
- Computer Science: 30 students
- Information Technology: 15 students
- Other departments: 10 students

## Faculty Present
- Dr. Mehta (Coordinator)
- Prof. Joshi (Guest Session)`,
      author: 'Event Coordinator',
      generatedAt: '2024-11-28T16:00:00Z',
      keyPoints: [
        '60 registered, 45 completed',
        '75% completion rate',
        '2 faculty members present',
      ],
    },
  ],
};

/**
 * Helper function to get summaries for an event
 * Returns empty array if no summaries exist for the event
 */
export function getSummariesForEvent(eventId: string): SummaryEntry[] {
  return summariesByEvent[eventId] || [];
}

/**
 * Helper function to get a specific summary by event ID and category
 * Returns undefined if not found
 */
export function getSummaryByCategory(
  eventId: string,
  category: SummaryCategory
): SummaryEntry | undefined {
  const summaries = getSummariesForEvent(eventId);
  return summaries.find((s) => s.category === category);
}

/**
 * Helper function to check if an event has any summaries
 */
export function hasSummaries(eventId: string): boolean {
  return getSummariesForEvent(eventId).length > 0;
}

/**
 * Get all available categories for an event
 */
export function getAvailableCategories(eventId: string): SummaryCategory[] {
  const summaries = getSummariesForEvent(eventId);
  return summaries.map((s) => s.category);
}
