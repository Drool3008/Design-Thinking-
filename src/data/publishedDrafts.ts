/**
 * Published Newsletter Drafts - Set 6
 * 
 * Stores newsletter drafts that have been published by the Archiver.
 * Used by faculty to generate a combined "Event Book" PDF/PNG.
 * 
 * Drafts are appended when the Archiver clicks "Publish Draft" in NewsletterDraftModal.
 */

export interface PublishedDraft {
  id: string;
  eventId: string;
  eventTitle: string;
  templateId: string;
  title: string;
  date: string;           // ISO date string
  htmlContent: string;    // Full rendered newsletter HTML
  summary: string;        // Short summary of the event
  club: string;           // Organizing club
  venue?: string;
  photos: string[];       // Selected photos
  publishedAt: string;    // ISO timestamp when published
}

// In-memory store for published drafts
// In production, this would be persisted to a database
let publishedDraftsStore: PublishedDraft[] = [
  // Sample published drafts for demonstration
  {
    id: 'draft-hackathon-2024',
    eventId: 'hackathon-2024',
    eventTitle: 'Hackathon 2024',
    templateId: 'tech-now',
    title: 'Hackathon 2024: Innovation Unleashed',
    date: '2024-09-15',
    club: 'Tech Club',
    venue: 'Main Auditorium',
    photos: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    ],
    summary: 'Over 200 students participated in a 24-hour hackathon, building innovative solutions for campus challenges. Teams showcased projects ranging from AI-powered study assistants to sustainable energy monitors.',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hackathon 2024: Innovation Unleashed</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: #1a1a2e; color: white; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 32px; }
    .section-title { color: #1a1a2e; font-size: 20px; font-weight: 600; margin-bottom: 16px; border-bottom: 2px solid #00d4ff; padding-bottom: 8px; }
    .summary { font-size: 16px; line-height: 1.7; color: #444; }
    .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 24px; }
    .gallery img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
    .footer { background: #1a1a1a; color: white; padding: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hackathon 2024: Innovation Unleashed</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">Tech Club Newsletter</p>
    </div>
    <div class="content">
      <div class="section-title">Event Highlights</div>
      <p class="summary">Over 200 students participated in a 24-hour hackathon, building innovative solutions for campus challenges. Teams showcased projects ranging from AI-powered study assistants to sustainable energy monitors.</p>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800" alt="Hackathon">
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800" alt="Teams">
      </div>
    </div>
    <div class="footer">
      <p>IIIT College Newsletter</p>
    </div>
  </div>
</body>
</html>`,
    publishedAt: '2024-09-20T10:00:00Z',
  },
  {
    id: 'draft-aiml-workshop',
    eventId: 'aiml-workshop-2024',
    eventTitle: 'AI/ML Workshop',
    templateId: 'academic-journal',
    title: 'AI/ML Workshop: Building the Future',
    date: '2024-10-05',
    club: 'AI Society',
    venue: 'Seminar Hall B',
    photos: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800',
    ],
    summary: 'A hands-on workshop covering machine learning fundamentals, neural networks, and practical applications. Participants built their first ML models using Python and TensorFlow.',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI/ML Workshop: Building the Future</title>
  <style>
    body { font-family: 'Georgia', serif; margin: 0; padding: 0; background: #fafafa; }
    .container { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: #1e3a5f; color: white; padding: 40px; text-align: center; border-bottom: 4px solid #c9a227; }
    .header h1 { margin: 0; font-size: 26px; font-weight: normal; }
    .content { padding: 40px; }
    .section-title { color: #1e3a5f; font-size: 18px; font-weight: 600; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
    .summary { font-size: 16px; line-height: 1.8; color: #333; }
    .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px; }
    .gallery img { width: 100%; height: 180px; object-fit: cover; border: 1px solid #ddd; }
    .footer { background: #1e3a5f; color: white; padding: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AI/ML Workshop: Building the Future</h1>
      <p style="margin: 12px 0 0; opacity: 0.8; font-style: italic;">AI Society Academic Report</p>
    </div>
    <div class="content">
      <div class="section-title">Workshop Summary</div>
      <p class="summary">A hands-on workshop covering machine learning fundamentals, neural networks, and practical applications. Participants built their first ML models using Python and TensorFlow.</p>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800" alt="AI Workshop">
        <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800" alt="ML Demo">
      </div>
    </div>
    <div class="footer">
      <p>IIIT College Newsletter</p>
    </div>
  </div>
</body>
</html>`,
    publishedAt: '2024-10-10T14:30:00Z',
  },
  {
    id: 'draft-sports-day',
    eventId: 'sports-day-2024',
    eventTitle: 'Annual Sports Day 2024',
    templateId: 'photo-story',
    title: 'Sports Day 2024: Champions Rise',
    date: '2024-11-12',
    club: 'Sports Committee',
    venue: 'College Ground',
    photos: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    ],
    summary: 'The annual sports day saw participation from all departments. Highlights included the 100m dash finals, basketball tournament, and the faculty vs students cricket match.',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sports Day 2024: Champions Rise</title>
  <style>
    body { font-family: 'Helvetica Neue', sans-serif; margin: 0; padding: 0; background: #f0f0f0; }
    .container { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 48px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 800; text-transform: uppercase; }
    .content { padding: 32px; }
    .section-title { color: #ff6b35; font-size: 22px; font-weight: 700; margin-bottom: 20px; }
    .summary { font-size: 17px; line-height: 1.7; color: #444; }
    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; }
    .gallery img { width: 100%; height: 150px; object-fit: cover; border-radius: 4px; }
    .footer { background: #333; color: white; padding: 24px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sports Day 2024</h1>
      <p style="margin: 12px 0 0; font-size: 18px;">Champions Rise</p>
    </div>
    <div class="content">
      <div class="section-title">Event Recap</div>
      <p class="summary">The annual sports day saw participation from all departments. Highlights included the 100m dash finals, basketball tournament, and the faculty vs students cricket match.</p>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" alt="Sports">
        <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800" alt="Running">
        <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800" alt="Fitness">
      </div>
    </div>
    <div class="footer">
      <p>IIIT College Newsletter</p>
    </div>
  </div>
</body>
</html>`,
    publishedAt: '2024-11-15T09:00:00Z',
  },
  {
    id: 'draft-cultural-fest',
    eventId: 'cultural-fest-2024',
    eventTitle: 'Cultural Fest 2024',
    templateId: 'magazine-spread',
    title: 'Cultural Fest: Colors of Tradition',
    date: '2024-08-20',
    club: 'Cultural Committee',
    venue: 'Open Air Theatre',
    photos: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    ],
    summary: 'A vibrant celebration of diverse cultures featuring dance performances, music, and traditional art. Students from across the country showcased their heritage through colorful performances.',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cultural Fest: Colors of Tradition</title>
  <style>
    body { font-family: 'Playfair Display', Georgia, serif; margin: 0; padding: 0; background: #fff5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 48px; text-align: center; }
    .header h1 { margin: 0; font-size: 36px; font-weight: 700; }
    .content { padding: 40px; }
    .section-title { color: #8b5cf6; font-size: 24px; font-weight: 600; margin-bottom: 20px; font-style: italic; }
    .summary { font-size: 18px; line-height: 1.9; color: #333; }
    .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 28px; }
    .gallery img { width: 100%; height: 220px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .footer { background: #1a1a1a; color: white; padding: 28px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Cultural Fest</h1>
      <p style="margin: 12px 0 0; font-size: 20px; font-style: italic;">Colors of Tradition</p>
    </div>
    <div class="content">
      <div class="section-title">Celebrating Diversity</div>
      <p class="summary">A vibrant celebration of diverse cultures featuring dance performances, music, and traditional art. Students from across the country showcased their heritage through colorful performances.</p>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" alt="Cultural">
        <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" alt="Performance">
      </div>
    </div>
    <div class="footer">
      <p>IIIT College Newsletter</p>
    </div>
  </div>
</body>
</html>`,
    publishedAt: '2024-08-25T16:00:00Z',
  },
  {
    id: 'draft-photography-walk',
    eventId: 'photography-walk-2024',
    eventTitle: 'Photography Walk 2024',
    templateId: 'photo-story',
    title: 'Photography Walk: Capturing Campus Life',
    date: '2024-10-28',
    club: 'Photography Club',
    venue: 'Campus Grounds',
    photos: [
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    ],
    summary: 'An early morning photography walk exploring the scenic corners of campus. Participants learned composition techniques, lighting fundamentals, and captured stunning shots of nature and architecture.',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Photography Walk: Capturing Campus Life</title>
  <style>
    body { font-family: 'Lato', sans-serif; margin: 0; padding: 0; background: #1a1a1a; color: white; }
    .container { max-width: 800px; margin: 0 auto; background: #2d2d2d; }
    .header { background: #000; padding: 48px; text-align: center; border-bottom: 2px solid #f59e0b; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; }
    .content { padding: 40px; }
    .section-title { color: #f59e0b; font-size: 16px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
    .summary { font-size: 16px; line-height: 1.8; color: #ccc; }
    .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 28px; }
    .gallery img { width: 100%; height: 200px; object-fit: cover; }
    .footer { background: #000; padding: 24px; text-align: center; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Photography Walk</h1>
      <p style="margin: 16px 0 0; color: #f59e0b; font-size: 14px; letter-spacing: 2px;">CAPTURING CAMPUS LIFE</p>
    </div>
    <div class="content">
      <div class="section-title">The Journey</div>
      <p class="summary">An early morning photography walk exploring the scenic corners of campus. Participants learned composition techniques, lighting fundamentals, and captured stunning shots of nature and architecture.</p>
      <div class="gallery">
        <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800" alt="Photography">
        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800" alt="Camera">
      </div>
    </div>
    <div class="footer">
      <p>IIIT Photography Club</p>
    </div>
  </div>
</body>
</html>`,
    publishedAt: '2024-11-02T11:00:00Z',
  },
];

/**
 * Get all published drafts
 */
export function getPublishedDrafts(): PublishedDraft[] {
  return [...publishedDraftsStore];
}

/**
 * Get published drafts within a date range
 */
export function getPublishedDraftsByDateRange(startDate: string, endDate: string): PublishedDraft[] {
  return publishedDraftsStore.filter((draft) => {
    const draftDate = new Date(draft.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return draftDate >= start && draftDate <= end;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get published draft by event ID
 */
export function getPublishedDraftByEventId(eventId: string): PublishedDraft | undefined {
  return publishedDraftsStore.find((draft) => draft.eventId === eventId);
}

/**
 * Add a new published draft (called when Archiver publishes a newsletter)
 */
export function addPublishedDraft(draft: PublishedDraft): void {
  // Check if draft for this event already exists
  const existingIndex = publishedDraftsStore.findIndex((d) => d.eventId === draft.eventId);
  if (existingIndex !== -1) {
    // Update existing draft
    publishedDraftsStore[existingIndex] = draft;
  } else {
    // Add new draft
    publishedDraftsStore.push(draft);
  }
}

/**
 * Check if an event has a published draft
 */
export function hasPublishedDraft(eventId: string): boolean {
  return publishedDraftsStore.some((draft) => draft.eventId === eventId);
}

/**
 * Get count of published drafts
 */
export function getPublishedDraftCount(): number {
  return publishedDraftsStore.length;
}
