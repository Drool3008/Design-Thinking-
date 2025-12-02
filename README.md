# College Event Management Portal# College Event Management Portal



A web application for managing college events from creation through archival. Built as part of a Design Thinking project.A web application designed to streamline how college events are created, managed, documented, and archived. Built as part of a Design Thinking project.



## Overview---



This portal enables different stakeholders in a college to collaborate on event management:## What This App Does



- Event organizers create and publish eventsThis portal helps different people in a college work together to manage events smoothly:

- Students and visitors browse and register for events

- Faculty members view events, connect with colleagues, and download event summaries- **Event organizers** can create and publish events

- The archival team preserves event documentation and publishes newsletters- **Students and visitors** can browse and register for events

- **Faculty members** can see events and connect with colleagues who attended

## User Roles- **Archival team** can preserve event memories with photos, videos, and summaries



### Event Group---



Club members or student organizers who run events. They can create events (starting as private drafts), add details, publish to make visible, generate registration links, mark events as ended, upload media content, and record faculty attendance.## Who Uses This App? (The Four Roles)



Typical workflow: Create Draft, Add Details, Publish, Event Happens, Mark Ended, Upload Content### 1.  Event Group

**Who they are:** Club members or student organizers who run events

### Viewer (Public/Students)

**What they can do:**

Anyone browsing the site. They can browse upcoming events, filter by club/date/type, view event details, register for events, and view galleries of past events.- Create new events (starts as a private draft)

- Add event details: title, date, time, location, description

### Faculty- Publish events to make them visible to everyone

- Generate registration links for attendees

Professors and staff members. In addition to viewer capabilities, they can see which colleagues attended events, view faculty details on hover, request meetings through the app, view event summaries by category, and download a combined Event Book of past newsletters. The faculty attendees section is only visible to other faculty.- Mark events as "ended" when they're over

- Upload photos, videos, audio recordings, and notes from the event

### Archiver- Record which faculty members attended



Staff responsible for documenting events. They can view ended events needing archival, review and add media content, control upload deadlines, run cleanup/validation (mock AI), generate summaries, create newsletter drafts from templates, publish newsletters to the Event Book, and finalize archives.**Their journey:**

```

## Event LifecycleCreate Draft → Add Details → Publish → Event Happens → Mark as Ended → Upload Content

```

Events progress through these stages:

---

1. Draft - Created by Event Group, visible only to them

2. Upcoming - Published and open for registration### 2.  Viewer (Public/Students)

3. Ended - Event concluded, content upload phase**Who they are:** Anyone browsing the website - students, parents, visitors

4. Archived - Finalized documentation available to all

**What they can do:**

## Screens- Browse all upcoming events on the homepage

- Filter events by club, date, or event type

| Screen | Access | Purpose |- View event details and descriptions

|--------|--------|---------|- Click registration links to sign up for events

| Homepage | Everyone | Browse events with filters |- View photo galleries of past events

| Event Detail | Everyone | Full event info and gallery |- Read event summaries and highlights

| Event Group Dashboard | Event Group | Create/edit events, upload content |

| Faculty Dashboard | Faculty | Events with faculty attendance view, Event Book download |**Their journey:**

| Archiver Dashboard | Archiver | Events to archive with progress |```

| Archiver Event Page | Archiver | Detailed archival tools and newsletter publishing |Visit Homepage → Browse Events → View Details → Register (if upcoming) or View Gallery (if past)

```

## Features

---

### Event Groups

- Event creation form with title, date, time, venue, description### 3.  Faculty

- Registration link generation**Who they are:** Professors and staff members of the college

- Multi-media upload for photos, videos, audio, text notes

- Faculty attendance tracking**What they can do:**

- See all upcoming events

### Faculty- See events that have ended (with photo galleries)

- Flash cards with colleague details on hover or click- See archived events with complete documentation

- Meeting request via email draft- **Special feature:** View which faculty colleagues attended an event

- Private attendance view- Hover over faculty names to see their details (department, research interests)

- Summary widget with category selection (research, lab, event recap, media highlights, attendance, student impact)- Request meetings with colleagues through the app

- Download summaries as PDF or PNG

- Event Book generator to download combined newsletters by date range**Their journey:**

```

### ArchiversLogin as Faculty → Browse Events → View Past Event → See Faculty Attendees → Request Meeting

- Upload window controls to extend or close deadlines```

- Mock AI cleanup, validation, and summary generation

- Step-by-step archival workflow with progress tracking**Note:** Only faculty members can see the "Faculty Attendees" section - this is private to faculty.

- Newsletter draft generator with 6 predefined templates

- Template customization with live preview---

- Publish newsletters to Event Book for faculty access

### 4.  Archiver

### Viewers**Who they are:** Staff responsible for documenting and preserving event records

- Filters for club, event type, and date

- Photo galleries for past events**What they can do:**

- Event summaries with key highlights- See all events that have ended and need archiving

- View content uploaded by Event Groups (photos, videos, notes)

## Newsletter Templates- Add additional photos, videos, and documents

- Control upload deadlines (extend or close the upload window)

Archivers can generate publication-ready newsletters using these templates:- Clean and organize the media (mock AI feature)

- Validate that all content is appropriate

1. Technology Now - Modern tech-inspired layout- Generate event summaries (mock AI feature)

2. Academic Journal - Formal academic styling- Finalize the archive to make it permanent

3. Photo Story - Image-focused magazine layout

4. Campus Life - Vibrant student newsletter**Their journey:**

5. Minimal Report - Clean and simple format```

6. Executive Brief - Professional summary styleView Ended Events → Review Event Group Content → Add More Media → Clean → Validate → Generate Summary → Finalize Archive

```

## Event Book

---

Faculty can generate a combined Event Book containing all published newsletters within a selected date range. The book includes:

##  The Complete Event Lifecycle

- Title page with date range

- Table of contentsHere's how an event flows through the system from start to finish:

- Individual event sections with summaries and photos

- Magazine-style layout with consistent formatting```

┌─────────────────────────────────────────────────────────────────────────

Download options: PDF, PNG, HTML, or plain text│                                                                         

│   DRAFT                                                               

## Getting Started│  Event Group creates event (only they can see it)                      

│                          ↓                                              

See GUIDE.md for complete setup instructions.│   UPCOMING (Published)                                                

│  Event is visible to everyone, registration open                       

```bash│                          ↓                                              

git clone https://github.com/Drool3008/Design-Thinking-.git│  🎉 Event Actually Happens (in real life)                              

cd Design-Thinking-│                          ↓                                              

npm install│   ENDED                                                               

npm run dev│  Event Group marks it as ended, uploads content                        

```│  Archiver can now work on it                                           

│                          ↓                                              

Open http://localhost:5173 in your browser. Use the role dropdown in the navigation to switch between user types.│   ARCHIVED                                                            

│  Archiver finalizes everything                                         

## Sample Data│  Complete gallery and summary available to all                         

│                                                                         

The app includes demo events:└─────────────────────────────────────────────────────────────────────────

- Upcoming: RoboWars 2025, AI/ML Workshop```

- Ended (with galleries): Hackathon 2024, Sports Day 2024

- Archived: Photography Walk 2024---



Sample published newsletters are available for testing the Event Book feature.##  How the Roles Depend on Each Other



## Tech Stack```

                    ┌─────────────┐

- React with TypeScript                    │  VIEWER     │

- Tailwind CSS                    │  (Public)   │

- Vite                    └──────┬──────┘

- React Router                           │ views events

- html2canvas and jspdf for PDF/PNG generation                           ↓

┌─────────────┐    ┌─────────────┐    ┌─────────────┐

## Project Structure│  EVENT      │───→│   EVENT     │───→│  ARCHIVER   │

│  GROUP      │    │   DATA      │    │             │

```│             │    │             │    │             │

src/│ Creates &   │    │ Shared by   │    │ Documents & │

  components/│ Publishes   │    │ all roles   │    │ Preserves   │

    ArchivalActions.tsx       - Step-by-step archival workflow└─────────────┘    └──────┬──────┘    └─────────────┘

    EventCard.tsx             - Event display card                          │

    EventForm.tsx             - Event creation/editing form                          ↓

    EventGallery.tsx          - Photo gallery component                   ┌─────────────┐

    FacultyAttendanceManager.tsx - Attendance tracking                   │  FACULTY    │

    FacultyDetailPanel.tsx    - Faculty information panel                   │             │

    FacultyEventBookGenerator.tsx - Event Book download modal                   │ Views +     │

    FacultyFlashCard.tsx      - Faculty hover/click card                   │ Connects    │

    FacultySummaryWidget.tsx  - Summary viewing and download                   └─────────────┘

    FilterBar.tsx             - Event filtering controls```

    NewsletterDraftModal.tsx  - Newsletter creation wizard

    NewsletterPreview.tsx     - Live template preview### Dependency Chain:

    TemplateSelector.tsx      - Template browsing UI

  context/1. **Event Group → Everyone**

    AuthContext.tsx           - Role-based authentication   - Nothing happens until Event Group creates and publishes an event

    EventContext.tsx          - Shared event state   - Viewers can only see published events

  data/   - Archiver can only work on ended events

    events.ts                 - Event data and types

    faculty.ts                - Faculty member data2. **Event Group → Archiver**

    publishedDrafts.ts        - Published newsletter storage   - Archiver sees content uploaded by Event Group

    summaries.ts              - Faculty summary data   - Archiver adds more content and cleans everything up

    templates.ts              - Newsletter template definitions   - Both contribute to the final gallery

  routes/

    ArchiverEventPage.tsx     - Individual event archival3. **Event Group → Faculty**

    DashboardArchiver.tsx     - Archiver overview   - Event Group records faculty attendance

    DashboardEventGroup.tsx   - Event Group management   - Faculty can then see who attended and connect with colleagues

    DashboardFaculty.tsx      - Faculty view with Event Book

    EventDetailPage.tsx       - Public event details4. **Archiver → Everyone**

    LandingPage.tsx           - Homepage   - Once Archiver finalizes, the complete event documentation is available

    LoginPage.tsx             - Role selection   - Summary, cleaned photos, and videos become public

  utils/

    bookBuilder.ts            - Event Book HTML/PDF generation---

    downloadUtils.ts          - PDF/PNG download utilities

```##  Main Screens in the App



## License| Screen | Who Sees It | What It Shows |

|--------|-------------|---------------|

Academic project for Design Thinking course.| **Homepage** | Everyone | Upcoming events, past events, search & filters |

| **Event Detail** | Everyone | Full event info, registration link, photo gallery |

## Contributors| **Event Group Dashboard** | Event Group only | Create/edit events, upload content, manage events |

| **Faculty Dashboard** | Faculty only | All events + special faculty attendance view |

Design Thinking TinkerLabs - 2025| **Archiver Dashboard** | Archiver only | List of events to archive, progress tracking |

| **Archiver Event Page** | Archiver only | Detailed archival tools for one event |

---

##  Special Features

### For Event Groups:
-  Rich event creation form with all details
-  Automatic registration link generation
-  Multi-media upload: photos, videos, audio, text notes
-  Faculty attendance checklist

### For Faculty:
-  Faculty Flash Cards - hover to see colleague details
-  "Request Meeting" button - creates email draft to colleagues
-  Private view of faculty attendance (other roles can't see this)

### For Archivers:
-  Upload window controls - extend deadlines or close uploads
-  Mock AI features: auto-clean, validate, generate summary
-  Preview of Event Group's uploaded content
-  Step-by-step archival workflow

### For Viewers:
-  Filter by club, event type, or date
-  Beautiful photo galleries for past events
-  Event summaries with key highlights

---

## 🚀 Getting Started

See [GUIDE.md](./GUIDE.md) for complete installation instructions.

**Quick start:**
```bash
git clone https://github.com/Drool3008/Design-Thinking-.git
cd Design-Thinking-
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🎭 Testing Different Roles

When you open the app, you can switch between roles using the dropdown in the navigation bar:

1. **No login** - You're a Viewer (public)
2. **Event Group** - Access to create and manage events
3. **Faculty** - Access to faculty-specific features
4. **Archiver** - Access to archival workflow

Try switching roles to see how the same events look different to different people!

---

## 📝 Sample Data

The app comes with sample events to demonstrate all features:

- **Upcoming events** (future dates) - RoboWars 2025, AI/ML Workshop, etc.
- **Ended events** (past, with galleries) - Hackathon 2024, Sports Day 2024
- **Archived events** (complete documentation) - Photography Walk 2024

---

## 🛠️ Built With

- **React** - For building the user interface
- **TypeScript** - For catching errors early
- **Tailwind CSS** - For beautiful, responsive design
- **Vite** - For fast development experience
- **React Router** - For navigation between pages

---

##  Contributors

- Design Thinking TinkerLabs - 2025

---

