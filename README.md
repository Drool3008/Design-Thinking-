# 🎓 College Event Management Portal

A web application designed to streamline how college events are created, managed, documented, and archived. Built as part of a Design Thinking project.

---

## 🌟 What This App Does

This portal helps different people in a college work together to manage events smoothly:

- **Event organizers** can create and publish events
- **Students and visitors** can browse and register for events
- **Faculty members** can see events and connect with colleagues who attended
- **Archival team** can preserve event memories with photos, videos, and summaries

---

## 👥 Who Uses This App? (The Four Roles)

### 1. 🎪 Event Group
**Who they are:** Club members or student organizers who run events

**What they can do:**
- Create new events (starts as a private draft)
- Add event details: title, date, time, location, description
- Publish events to make them visible to everyone
- Generate registration links for attendees
- Mark events as "ended" when they're over
- Upload photos, videos, audio recordings, and notes from the event
- Record which faculty members attended

**Their journey:**
```
Create Draft → Add Details → Publish → Event Happens → Mark as Ended → Upload Content
```

---

### 2. 👀 Viewer (Public/Students)
**Who they are:** Anyone browsing the website - students, parents, visitors

**What they can do:**
- Browse all upcoming events on the homepage
- Filter events by club, date, or event type
- View event details and descriptions
- Click registration links to sign up for events
- View photo galleries of past events
- Read event summaries and highlights

**Their journey:**
```
Visit Homepage → Browse Events → View Details → Register (if upcoming) or View Gallery (if past)
```

---

### 3. 👨‍🏫 Faculty
**Who they are:** Professors and staff members of the college

**What they can do:**
- See all upcoming events
- See events that have ended (with photo galleries)
- See archived events with complete documentation
- **Special feature:** View which faculty colleagues attended an event
- Hover over faculty names to see their details (department, research interests)
- Request meetings with colleagues through the app

**Their journey:**
```
Login as Faculty → Browse Events → View Past Event → See Faculty Attendees → Request Meeting
```

**Note:** Only faculty members can see the "Faculty Attendees" section - this is private to faculty.

---

### 4. 📦 Archiver
**Who they are:** Staff responsible for documenting and preserving event records

**What they can do:**
- See all events that have ended and need archiving
- View content uploaded by Event Groups (photos, videos, notes)
- Add additional photos, videos, and documents
- Control upload deadlines (extend or close the upload window)
- Clean and organize the media (mock AI feature)
- Validate that all content is appropriate
- Generate event summaries (mock AI feature)
- Finalize the archive to make it permanent

**Their journey:**
```
View Ended Events → Review Event Group Content → Add More Media → Clean → Validate → Generate Summary → Finalize Archive
```

---

## 🔄 The Complete Event Lifecycle

Here's how an event flows through the system from start to finish:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  📝 DRAFT                                                               │
│  Event Group creates event (only they can see it)                      │
│                          ↓                                              │
│  📢 UPCOMING (Published)                                                │
│  Event is visible to everyone, registration open                       │
│                          ↓                                              │
│  🎉 Event Actually Happens (in real life)                              │
│                          ↓                                              │
│  ⏹️ ENDED                                                               │
│  Event Group marks it as ended, uploads content                        │
│  Archiver can now work on it                                           │
│                          ↓                                              │
│  📚 ARCHIVED                                                            │
│  Archiver finalizes everything                                         │
│  Complete gallery and summary available to all                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
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

