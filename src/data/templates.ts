/**
 * Newsletter Templates Data - Set 5
 * 
 * Predefined templates for generating publication drafts after archival.
 * Each template has a unique layout, color scheme, and section structure.
 * 
 * Templates are inspired by:
 * - Magazine-style article layouts
 * - School/college newsletter designs
 * - Modern tech publication formats
 */

// Template section types
export type SectionType = 
  | 'header'
  | 'hero-image'
  | 'title-block'
  | 'summary'
  | 'photo-grid'
  | 'photo-story'
  | 'faculty-spotlight'
  | 'quotes'
  | 'highlights'
  | 'sidebar'
  | 'event-details'
  | 'footer'
  | 'divider'
  | 'call-to-action'
  | 'stats-block'
  | 'two-column'
  | 'custom-html';

// Individual section configuration
export interface TemplateSection {
  id: string;
  type: SectionType;
  title?: string;
  content?: string;        // Placeholder or default content
  imageCount?: number;     // For photo sections
  showDate?: boolean;
  showVenue?: boolean;
  showClub?: boolean;
  editable?: boolean;      // Can archiver edit this section
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  columns?: number;        // For grid layouts
  order: number;           // Section order in template
}

// Color scheme for templates
export interface TemplateColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

// Full template layout configuration
export interface TemplateLayout {
  sections: TemplateSection[];
  colorScheme: TemplateColorScheme;
  fontFamily: string;
  headerStyle: 'banner' | 'minimal' | 'magazine' | 'academic';
  footerStyle: 'simple' | 'detailed' | 'minimal';
  maxPhotos: number;
  showFacultySection: boolean;
  showQuotes: boolean;
}

// Main template interface
export interface NewsletterTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  layout: TemplateLayout;
  category: 'modern' | 'academic' | 'magazine' | 'photo-centric' | 'minimal' | 'formal';
  isCustom?: boolean;      // User-created template
  createdAt?: string;
}

// Draft object for email/newsletter generation
export interface NewsletterDraft {
  id: string;
  eventId: string;
  templateId: string;
  subject: string;
  bodyHtml: string;
  recipients: string[];
  attachments: string[];
  createdAt: string;
  customizations: {
    title?: string;
    summary?: string;
    selectedPhotos: string[];
    facultyNames: string[];
    customQuotes: string[];
    additionalSections: TemplateSection[];
  };
}

// ============================================
// PREDEFINED TEMPLATES (6+)
// ============================================

export const predefinedTemplates: NewsletterTemplate[] = [
  // ──────────────────────────────────────────
  // 1. TECHNOLOGY NOW Template
  // ──────────────────────────────────────────
  {
    id: 'tech-now',
    name: 'Technology Now',
    description: 'Modern tech-inspired layout with bold headers and clean sections. Perfect for workshops, hackathons, and tech events.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop',
    category: 'modern',
    layout: {
      sections: [
        {
          id: 'header-1',
          type: 'header',
          title: 'TECHNOLOGY NOW',
          content: 'Your Campus Tech Digest',
          backgroundColor: '#1a1a2e',
          textColor: '#ffffff',
          accentColor: '#00d4ff',
          order: 1,
          editable: true,
        },
        {
          id: 'hero-1',
          type: 'hero-image',
          imageCount: 1,
          order: 2,
          editable: false,
        },
        {
          id: 'title-1',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          backgroundColor: '#ffffff',
          textColor: '#1a1a2e',
          accentColor: '#00d4ff',
          order: 3,
          editable: true,
        },
        {
          id: 'summary-1',
          type: 'summary',
          title: 'Event Highlights',
          editable: true,
          order: 4,
        },
        {
          id: 'photos-1',
          type: 'photo-grid',
          title: 'Moments Captured',
          imageCount: 4,
          columns: 2,
          order: 5,
          editable: false,
        },
        {
          id: 'stats-1',
          type: 'stats-block',
          title: 'By The Numbers',
          order: 6,
          editable: true,
        },
        {
          id: 'faculty-1',
          type: 'faculty-spotlight',
          title: 'Faculty In Attendance',
          order: 7,
          editable: true,
        },
        {
          id: 'footer-1',
          type: 'footer',
          content: 'For more updates, visit our campus portal',
          order: 8,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#1a1a2e',
        secondary: '#16213e',
        accent: '#00d4ff',
        background: '#ffffff',
        text: '#333333',
        muted: '#666666',
      },
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      headerStyle: 'banner',
      footerStyle: 'simple',
      maxPhotos: 6,
      showFacultySection: true,
      showQuotes: false,
    },
  },

  // ──────────────────────────────────────────
  // 2. CAMPUS BULLETIN Template
  // ──────────────────────────────────────────
  {
    id: 'campus-bulletin',
    name: 'Campus Bulletin',
    description: 'Classic school newsletter style with warm colors and structured sections. Great for general campus events.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop',
    category: 'academic',
    layout: {
      sections: [
        {
          id: 'header-2',
          type: 'header',
          title: 'CAMPUS BULLETIN',
          content: 'Weekly News & Updates',
          backgroundColor: '#2d5a27',
          textColor: '#ffffff',
          accentColor: '#f4d03f',
          order: 1,
          editable: true,
        },
        {
          id: 'title-2',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          order: 2,
          editable: true,
        },
        {
          id: 'hero-2',
          type: 'hero-image',
          imageCount: 1,
          order: 3,
          editable: false,
        },
        {
          id: 'summary-2',
          type: 'summary',
          title: 'Event Recap',
          editable: true,
          order: 4,
        },
        {
          id: 'highlights-2',
          type: 'highlights',
          title: 'Key Highlights',
          order: 5,
          editable: true,
        },
        {
          id: 'two-col-2',
          type: 'two-column',
          title: 'This Week in Pictures',
          imageCount: 4,
          columns: 2,
          order: 6,
          editable: false,
        },
        {
          id: 'quotes-2',
          type: 'quotes',
          title: 'What Participants Said',
          order: 7,
          editable: true,
        },
        {
          id: 'faculty-2',
          type: 'faculty-spotlight',
          title: 'Faculty Coordinators',
          order: 8,
          editable: true,
        },
        {
          id: 'footer-2',
          type: 'footer',
          content: 'Published by Student Affairs Office',
          order: 9,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#2d5a27',
        secondary: '#3d7a35',
        accent: '#f4d03f',
        background: '#fefefe',
        text: '#2c3e50',
        muted: '#7f8c8d',
      },
      fontFamily: "'Georgia', 'Times New Roman', serif",
      headerStyle: 'academic',
      footerStyle: 'detailed',
      maxPhotos: 5,
      showFacultySection: true,
      showQuotes: true,
    },
  },

  // ──────────────────────────────────────────
  // 3. RESEARCH & DISCOVERY Template
  // ──────────────────────────────────────────
  {
    id: 'research-discovery',
    name: 'Research & Discovery',
    description: 'Academic and research-focused layout with emphasis on content. Ideal for seminars, conferences, and research presentations.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
    category: 'academic',
    layout: {
      sections: [
        {
          id: 'header-3',
          type: 'header',
          title: 'RESEARCH & DISCOVERY',
          content: 'Academic Excellence Newsletter',
          backgroundColor: '#2c3e50',
          textColor: '#ecf0f1',
          accentColor: '#3498db',
          order: 1,
          editable: true,
        },
        {
          id: 'title-3',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          backgroundColor: '#ecf0f1',
          textColor: '#2c3e50',
          order: 2,
          editable: true,
        },
        {
          id: 'sidebar-3',
          type: 'sidebar',
          title: 'Quick Facts',
          order: 3,
          editable: true,
        },
        {
          id: 'summary-3',
          type: 'summary',
          title: 'Executive Summary',
          editable: true,
          order: 4,
        },
        {
          id: 'hero-3',
          type: 'hero-image',
          imageCount: 1,
          order: 5,
          editable: false,
        },
        {
          id: 'faculty-3',
          type: 'faculty-spotlight',
          title: 'Speakers & Panelists',
          order: 6,
          editable: true,
        },
        {
          id: 'highlights-3',
          type: 'highlights',
          title: 'Key Takeaways',
          order: 7,
          editable: true,
        },
        {
          id: 'photos-3',
          type: 'photo-grid',
          title: 'Event Gallery',
          imageCount: 3,
          columns: 3,
          order: 8,
          editable: false,
        },
        {
          id: 'cta-3',
          type: 'call-to-action',
          title: 'Learn More',
          content: 'Access full presentation materials',
          order: 9,
          editable: true,
        },
        {
          id: 'footer-3',
          type: 'footer',
          content: 'Research Office | Academic Affairs',
          order: 10,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#3498db',
        background: '#ffffff',
        text: '#2c3e50',
        muted: '#95a5a6',
      },
      fontFamily: "'Merriweather', 'Georgia', serif",
      headerStyle: 'academic',
      footerStyle: 'detailed',
      maxPhotos: 4,
      showFacultySection: true,
      showQuotes: false,
    },
  },

  // ──────────────────────────────────────────
  // 4. STUDENT ACTIVITY JOURNAL Template
  // ──────────────────────────────────────────
  {
    id: 'student-journal',
    name: 'Student Activity Journal',
    description: 'Vibrant and energetic layout for student club activities, fests, and cultural events.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop',
    category: 'magazine',
    layout: {
      sections: [
        {
          id: 'header-4',
          type: 'header',
          title: 'STUDENT ACTIVITY JOURNAL',
          content: 'Campus Life & Beyond',
          backgroundColor: '#e74c3c',
          textColor: '#ffffff',
          accentColor: '#f39c12',
          order: 1,
          editable: true,
        },
        {
          id: 'hero-4',
          type: 'hero-image',
          imageCount: 1,
          order: 2,
          editable: false,
        },
        {
          id: 'title-4',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          backgroundColor: '#ffffff',
          accentColor: '#e74c3c',
          order: 3,
          editable: true,
        },
        {
          id: 'summary-4',
          type: 'summary',
          title: 'The Story',
          editable: true,
          order: 4,
        },
        {
          id: 'photo-story-4',
          type: 'photo-story',
          title: 'Week in Pictures',
          imageCount: 6,
          columns: 3,
          order: 5,
          editable: false,
        },
        {
          id: 'quotes-4',
          type: 'quotes',
          title: 'Voices from the Event',
          order: 6,
          editable: true,
        },
        {
          id: 'highlights-4',
          type: 'highlights',
          title: 'Fun Facts & Highlights',
          accentColor: '#f39c12',
          order: 7,
          editable: true,
        },
        {
          id: 'faculty-4',
          type: 'faculty-spotlight',
          title: 'Faculty Advisors',
          order: 8,
          editable: true,
        },
        {
          id: 'cta-4',
          type: 'call-to-action',
          title: 'Join the Club!',
          content: 'Become part of our community',
          backgroundColor: '#e74c3c',
          textColor: '#ffffff',
          order: 9,
          editable: true,
        },
        {
          id: 'footer-4',
          type: 'footer',
          content: 'Student Council | Campus Activities',
          order: 10,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#e74c3c',
        secondary: '#c0392b',
        accent: '#f39c12',
        background: '#ffffff',
        text: '#2c3e50',
        muted: '#7f8c8d',
      },
      fontFamily: "'Poppins', 'Helvetica Neue', sans-serif",
      headerStyle: 'magazine',
      footerStyle: 'simple',
      maxPhotos: 8,
      showFacultySection: true,
      showQuotes: true,
    },
  },

  // ──────────────────────────────────────────
  // 5. PHOTO STORY Template
  // ──────────────────────────────────────────
  {
    id: 'photo-story',
    name: 'Photo Story',
    description: 'Photo-centric layout that puts images front and center. Perfect for cultural events, exhibitions, and visual showcases.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    category: 'photo-centric',
    layout: {
      sections: [
        {
          id: 'header-5',
          type: 'header',
          title: 'PHOTO STORY',
          content: 'A Visual Journey',
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff',
          accentColor: '#e91e63',
          order: 1,
          editable: true,
        },
        {
          id: 'hero-5',
          type: 'hero-image',
          imageCount: 1,
          order: 2,
          editable: false,
        },
        {
          id: 'title-5',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff',
          order: 3,
          editable: true,
        },
        {
          id: 'summary-5',
          type: 'summary',
          title: 'The Narrative',
          editable: true,
          backgroundColor: '#f5f5f5',
          order: 4,
        },
        {
          id: 'photo-grid-5a',
          type: 'photo-grid',
          title: 'Captured Moments',
          imageCount: 3,
          columns: 3,
          order: 5,
          editable: false,
        },
        {
          id: 'divider-5',
          type: 'divider',
          order: 6,
          editable: false,
        },
        {
          id: 'photo-grid-5b',
          type: 'photo-grid',
          title: 'Behind the Scenes',
          imageCount: 4,
          columns: 2,
          order: 7,
          editable: false,
        },
        {
          id: 'quotes-5',
          type: 'quotes',
          title: 'In Their Words',
          order: 8,
          editable: true,
        },
        {
          id: 'footer-5',
          type: 'footer',
          content: 'Photography Club | Media Team',
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff',
          order: 9,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#1a1a1a',
        secondary: '#333333',
        accent: '#e91e63',
        background: '#ffffff',
        text: '#1a1a1a',
        muted: '#666666',
      },
      fontFamily: "'Playfair Display', 'Georgia', serif",
      headerStyle: 'minimal',
      footerStyle: 'minimal',
      maxPhotos: 10,
      showFacultySection: false,
      showQuotes: true,
    },
  },

  // ──────────────────────────────────────────
  // 6. FORMAL EVENT RECAP Template
  // ──────────────────────────────────────────
  {
    id: 'formal-recap',
    name: 'Formal Event Recap',
    description: 'Professional and elegant layout for formal events, convocations, and official functions.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    category: 'formal',
    layout: {
      sections: [
        {
          id: 'header-6',
          type: 'header',
          title: 'OFFICIAL EVENT RECAP',
          content: 'Office of Student Affairs',
          backgroundColor: '#1a237e',
          textColor: '#ffffff',
          accentColor: '#ffc107',
          order: 1,
          editable: true,
        },
        {
          id: 'title-6',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          backgroundColor: '#f5f5f5',
          textColor: '#1a237e',
          order: 2,
          editable: true,
        },
        {
          id: 'hero-6',
          type: 'hero-image',
          imageCount: 1,
          order: 3,
          editable: false,
        },
        {
          id: 'summary-6',
          type: 'summary',
          title: 'Event Overview',
          editable: true,
          order: 4,
        },
        {
          id: 'event-details-6',
          type: 'event-details',
          title: 'Program Details',
          showDate: true,
          showVenue: true,
          order: 5,
          editable: true,
        },
        {
          id: 'faculty-6',
          type: 'faculty-spotlight',
          title: 'Distinguished Guests & Faculty',
          order: 6,
          editable: true,
        },
        {
          id: 'highlights-6',
          type: 'highlights',
          title: 'Key Moments',
          order: 7,
          editable: true,
        },
        {
          id: 'photos-6',
          type: 'photo-grid',
          title: 'Event Gallery',
          imageCount: 4,
          columns: 2,
          order: 8,
          editable: false,
        },
        {
          id: 'quotes-6',
          type: 'quotes',
          title: 'Messages from Leadership',
          order: 9,
          editable: true,
        },
        {
          id: 'footer-6',
          type: 'footer',
          content: 'For official use | Office of Student Affairs',
          backgroundColor: '#1a237e',
          textColor: '#ffffff',
          order: 10,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#1a237e',
        secondary: '#303f9f',
        accent: '#ffc107',
        background: '#ffffff',
        text: '#212121',
        muted: '#757575',
      },
      fontFamily: "'Crimson Text', 'Times New Roman', serif",
      headerStyle: 'banner',
      footerStyle: 'detailed',
      maxPhotos: 6,
      showFacultySection: true,
      showQuotes: true,
    },
  },

  // ──────────────────────────────────────────
  // 7. SCI BUZZ HIGHLIGHTS Template (Bonus)
  // ──────────────────────────────────────────
  {
    id: 'sci-buzz',
    name: 'Sci Buzz Highlights',
    description: 'Science and innovation focused template with dynamic sections. Great for science fairs, tech demos, and innovation showcases.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&h=200&fit=crop',
    category: 'modern',
    layout: {
      sections: [
        {
          id: 'header-7',
          type: 'header',
          title: 'SCI BUZZ',
          content: 'Innovation & Discovery Weekly',
          backgroundColor: '#00695c',
          textColor: '#ffffff',
          accentColor: '#76ff03',
          order: 1,
          editable: true,
        },
        {
          id: 'hero-7',
          type: 'hero-image',
          imageCount: 1,
          order: 2,
          editable: false,
        },
        {
          id: 'title-7',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          accentColor: '#00695c',
          order: 3,
          editable: true,
        },
        {
          id: 'stats-7',
          type: 'stats-block',
          title: 'Event Stats',
          backgroundColor: '#e0f2f1',
          order: 4,
          editable: true,
        },
        {
          id: 'summary-7',
          type: 'summary',
          title: 'What Happened',
          editable: true,
          order: 5,
        },
        {
          id: 'two-col-7',
          type: 'two-column',
          title: 'Innovations Showcased',
          imageCount: 4,
          columns: 2,
          order: 6,
          editable: false,
        },
        {
          id: 'faculty-7',
          type: 'faculty-spotlight',
          title: 'Expert Panel',
          order: 7,
          editable: true,
        },
        {
          id: 'highlights-7',
          type: 'highlights',
          title: 'Breakthrough Moments',
          accentColor: '#76ff03',
          order: 8,
          editable: true,
        },
        {
          id: 'cta-7',
          type: 'call-to-action',
          title: 'Join the Innovation Lab',
          content: 'Register for upcoming workshops',
          backgroundColor: '#00695c',
          textColor: '#ffffff',
          order: 9,
          editable: true,
        },
        {
          id: 'footer-7',
          type: 'footer',
          content: 'Science & Innovation Cell',
          order: 10,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#00695c',
        secondary: '#00897b',
        accent: '#76ff03',
        background: '#ffffff',
        text: '#263238',
        muted: '#607d8b',
      },
      fontFamily: "'Roboto', 'Arial', sans-serif",
      headerStyle: 'magazine',
      footerStyle: 'simple',
      maxPhotos: 6,
      showFacultySection: true,
      showQuotes: false,
    },
  },

  // ──────────────────────────────────────────
  // 8. MINIMAL DIGEST Template (Bonus)
  // ──────────────────────────────────────────
  {
    id: 'minimal-digest',
    name: 'Minimal Digest',
    description: 'Clean, minimalist design with focus on readability. Suitable for any type of event recap.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&h=200&fit=crop',
    category: 'minimal',
    layout: {
      sections: [
        {
          id: 'header-8',
          type: 'header',
          title: 'EVENT DIGEST',
          content: 'A Brief Recap',
          backgroundColor: '#ffffff',
          textColor: '#111111',
          accentColor: '#111111',
          order: 1,
          editable: true,
        },
        {
          id: 'divider-8a',
          type: 'divider',
          order: 2,
          editable: false,
        },
        {
          id: 'title-8',
          type: 'title-block',
          showDate: true,
          showVenue: true,
          showClub: true,
          order: 3,
          editable: true,
        },
        {
          id: 'hero-8',
          type: 'hero-image',
          imageCount: 1,
          order: 4,
          editable: false,
        },
        {
          id: 'summary-8',
          type: 'summary',
          title: 'Summary',
          editable: true,
          order: 5,
        },
        {
          id: 'photos-8',
          type: 'photo-grid',
          title: 'Gallery',
          imageCount: 3,
          columns: 3,
          order: 6,
          editable: false,
        },
        {
          id: 'divider-8b',
          type: 'divider',
          order: 7,
          editable: false,
        },
        {
          id: 'footer-8',
          type: 'footer',
          content: 'Thank you for reading',
          order: 8,
          editable: true,
        },
      ],
      colorScheme: {
        primary: '#111111',
        secondary: '#333333',
        accent: '#111111',
        background: '#ffffff',
        text: '#111111',
        muted: '#888888',
      },
      fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
      headerStyle: 'minimal',
      footerStyle: 'minimal',
      maxPhotos: 4,
      showFacultySection: false,
      showQuotes: false,
    },
  },
];

// Helper function to get template by ID
export const getTemplateById = (id: string): NewsletterTemplate | undefined => {
  return predefinedTemplates.find(t => t.id === id);
};

// Helper function to get templates by category
export const getTemplatesByCategory = (category: NewsletterTemplate['category']): NewsletterTemplate[] => {
  return predefinedTemplates.filter(t => t.category === category);
};

// Blank template for custom creation
export const blankTemplate: NewsletterTemplate = {
  id: 'custom-blank',
  name: 'Blank Template',
  description: 'Start from scratch with a blank template',
  category: 'minimal',
  isCustom: true,
  layout: {
    sections: [
      {
        id: 'header-custom',
        type: 'header',
        title: 'Newsletter Title',
        content: 'Subtitle goes here',
        order: 1,
        editable: true,
      },
      {
        id: 'title-custom',
        type: 'title-block',
        showDate: true,
        showVenue: true,
        showClub: true,
        order: 2,
        editable: true,
      },
      {
        id: 'summary-custom',
        type: 'summary',
        title: 'Event Summary',
        editable: true,
        order: 3,
      },
      {
        id: 'footer-custom',
        type: 'footer',
        content: 'Footer content',
        order: 4,
        editable: true,
      },
    ],
    colorScheme: {
      primary: '#333333',
      secondary: '#666666',
      accent: '#0066cc',
      background: '#ffffff',
      text: '#333333',
      muted: '#999999',
    },
    fontFamily: "'Arial', sans-serif",
    headerStyle: 'minimal',
    footerStyle: 'simple',
    maxPhotos: 5,
    showFacultySection: true,
    showQuotes: true,
  },
};

export default predefinedTemplates;
