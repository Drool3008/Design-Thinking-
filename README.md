# College Event Management Portal# 🎓 College Event Management Portal



A web application for managing college events from creation through archival. Built as part of a Design Thinking project.A web application designed to streamline how college events are created, managed, documented, and archived. Built as part of a Design Thinking project.



## Overview---



This portal enables different stakeholders in a college to collaborate on event management:## 🌟 What This App Does



- Event organizers create and publish eventsThis portal helps different people in a college work together to manage events smoothly:

- Students and visitors browse and register for events

- Faculty members view events and connect with colleagues- **Event organizers** can create and publish events

- The archival team preserves event documentation- **Students and visitors** can browse and register for events

- **Faculty members** can see events and connect with colleagues who attended

## User Roles- **Archival team** can preserve event memories with photos, videos, and summaries



### Event Group---



Club members or student organizers who run events. They can create events (starting as private drafts), add details, publish to make visible, generate registration links, mark events as ended, upload media content, and record faculty attendance.## 👥 Who Uses This App? (The Four Roles)



Typical workflow: Create Draft → Add Details → Publish → Event Happens → Mark Ended → Upload Content### 1. 🎪 Event Group

**Who they are:** Club members or student organizers who run events

### Viewer (Public/Students)

**What they can do:**

Anyone browsing the site. They can browse upcoming events, filter by club/date/type, view event details, register for events, and view galleries of past events.- Create new events (starts as a private draft)

- Add event details: title, date, time, location, description

### Faculty- Publish events to make them visible to everyone

- Generate registration links for attendees

Professors and staff members. In addition to viewer capabilities, they can see which colleagues attended events, view faculty details on hover, and request meetings through the app. The faculty attendees section is only visible to other faculty.- Mark events as "ended" when they're over

- Upload photos, videos, audio recordings, and notes from the event

### Archiver- Record which faculty members attended



Staff responsible for documenting events. They can view ended events needing archival, review and add media content, control upload deadlines, run cleanup/validation (mock AI), generate summaries, and finalize archives.**Their journey:**

```

## Event LifecycleCreate Draft → Add Details → Publish → Event Happens → Mark as Ended → Upload Content

```

Events progress through these stages:

---

1. **Draft** - Created by Event Group, visible only to them

2. **Upcoming** - Published and open for registration### 2. 👀 Viewer (Public/Students)

3. **Ended** - Event concluded, content upload phase**Who they are:** Anyone browsing the website - students, parents, visitors

4. **Archived** - Finalized documentation available to all

**What they can do:**

## Screens- Browse all upcoming events on the homepage

- Filter events by club, date, or event type

| Screen | Access | Purpose |- View event details and descriptions

|--------|--------|---------|- Click registration links to sign up for events

| Homepage | Everyone | Browse events with filters |- View photo galleries of past events

| Event Detail | Everyone | Full event info and gallery |- Read event summaries and highlights

| Event Group Dashboard | Event Group | Create/edit events, upload content |

| Faculty Dashboard | Faculty | Events with faculty attendance view |**Their journey:**

| Archiver Dashboard | Archiver | Events to archive with progress |```

| Archiver Event Page | Archiver | Detailed archival tools |Visit Homepage → Browse Events → View Details → Register (if upcoming) or View Gallery (if past)

```

## Features

---

**Event Groups:** Event creation form, registration link generation, multi-media upload, faculty attendance tracking

### 3. 👨‍🏫 Faculty

**Faculty:** Flash cards with colleague details, meeting request via email, private attendance view**Who they are:** Professors and staff members of the college



**Archivers:** Upload window controls, mock AI cleanup/validation/summary generation, step-by-step workflow**What they can do:**

- See all upcoming events

**Viewers:** Filters for club/type/date, photo galleries, event summaries- See events that have ended (with photo galleries)

- See archived events with complete documentation

## Getting Started- **Special feature:** View which faculty colleagues attended an event

- Hover over faculty names to see their details (department, research interests)

See [GUIDE.md](./GUIDE.md) for complete setup instructions.- Request meetings with colleagues through the app



```bash**Their journey:**

git clone https://github.com/Drool3008/Design-Thinking-.git```

cd Design-Thinking-Login as Faculty → Browse Events → View Past Event → See Faculty Attendees → Request Meeting

npm install```

npm run dev

```**Note:** Only faculty members can see the "Faculty Attendees" section - this is private to faculty.



Open `http://localhost:5173` in your browser. Use the role dropdown in the navigation to switch between user types.---



## Sample Data### 4. 📦 Archiver

**Who they are:** Staff responsible for documenting and preserving event records

The app includes demo events:

- Upcoming: RoboWars 2025, AI/ML Workshop**What they can do:**

- Ended (with galleries): Hackathon 2024, Sports Day 2024- See all events that have ended and need archiving

- Archived: Photography Walk 2024- View content uploaded by Event Groups (photos, videos, notes)

- Add additional photos, videos, and documents

## Tech Stack- Control upload deadlines (extend or close the upload window)

- Clean and organize the media (mock AI feature)

- React + TypeScript- Validate that all content is appropriate

- Tailwind CSS- Generate event summaries (mock AI feature)

- Vite- Finalize the archive to make it permanent

- React Router

**Their journey:**

## License```

View Ended Events → Review Event Group Content → Add More Media → Clean → Validate → Generate Summary → Finalize Archive

Academic project for Design Thinking course.```



## Contributors---



Design Thinking TinkerLabs - 2025## 🔄 The Complete Event Lifecycle


Here's how an event flows through the system from start to finish:

```
┌─────────────────────────────────────────────────────────────────────────
│                                                                         
│  📝 DRAFT                                                               
│  Event Group creates event (only they can see it)                      
│                          ↓                                              
│  📢 UPCOMING (Published)                                                
│  Event is visible to everyone, registration open                       
│                          ↓                                              
│  🎉 Event Actually Happens (in real life)                              
│                          ↓                                              
│  ⏹️ ENDED                                                               
│  Event Group marks it as ended, uploads content                        
│  Archiver can now work on it                                           
│                          ↓                                              
│  📚 ARCHIVED                                                            
│  Archiver finalizes everything                                         
│  Complete gallery and summary available to all                         
│                                                                         
└─────────────────────────────────────────────────────────────────────────
```

---

## 🔗 How the Roles Depend on Each Other

```
                    ┌─────────────┐
                    │  VIEWER     │
                    │  (Public)   │
                    └──────┬──────┘
                           │ views events
                           ↓
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  EVENT      │───→│   EVENT     │───→│  ARCHIVER   │
│  GROUP      │    │   DATA      │    │             │
│             │    │             │    │             │
│ Creates &   │    │ Shared by   │    │ Documents & │
│ Publishes   │    │ all roles   │    │ Preserves   │
└─────────────┘    └──────┬──────┘    └─────────────┘
                          │
                          ↓
                   ┌─────────────┐
                   │  FACULTY    │
                   │             │
                   │ Views +     │
                   │ Connects    │
                   └─────────────┘
```

### Dependency Chain:

1. **Event Group → Everyone**
   - Nothing happens until Event Group creates and publishes an event
   - Viewers can only see published events
   - Archiver can only work on ended events

2. **Event Group → Archiver**
   - Archiver sees content uploaded by Event Group
   - Archiver adds more content and cleans everything up
   - Both contribute to the final gallery

3. **Event Group → Faculty**
   - Event Group records faculty attendance
   - Faculty can then see who attended and connect with colleagues

4. **Archiver → Everyone**
   - Once Archiver finalizes, the complete event documentation is available
   - Summary, cleaned photos, and videos become public

---

## 📱 Main Screens in the App

| Screen | Who Sees It | What It Shows |
|--------|-------------|---------------|
| **Homepage** | Everyone | Upcoming events, past events, search & filters |
| **Event Detail** | Everyone | Full event info, registration link, photo gallery |
| **Event Group Dashboard** | Event Group only | Create/edit events, upload content, manage events |
| **Faculty Dashboard** | Faculty only | All events + special faculty attendance view |
| **Archiver Dashboard** | Archiver only | List of events to archive, progress tracking |
| **Archiver Event Page** | Archiver only | Detailed archival tools for one event |

---

## ✨ Special Features

### For Event Groups:
- 📝 Rich event creation form with all details
- 🔗 Automatic registration link generation
- 📸 Multi-media upload: photos, videos, audio, text notes
- ✅ Faculty attendance checklist

### For Faculty:
- 👤 Faculty Flash Cards - hover to see colleague details
- 📧 "Request Meeting" button - creates email draft to colleagues
- 🔒 Private view of faculty attendance (other roles can't see this)

### For Archivers:
- ⏰ Upload window controls - extend deadlines or close uploads
- 🤖 Mock AI features: auto-clean, validate, generate summary
- 👁️ Preview of Event Group's uploaded content
- ✅ Step-by-step archival workflow

### For Viewers:
- 🔍 Filter by club, event type, or date
- 🖼️ Beautiful photo galleries for past events
- 📖 Event summaries with key highlights

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

## 📄 License

This project is part of an academic Design Thinking course project.

---

## 👨‍💻 Contributors

- Design Thinking TinkerLabs - 2025

---

