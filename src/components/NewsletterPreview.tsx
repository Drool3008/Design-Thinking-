/**
 * NewsletterPreview Component - Set 5
 * 
 * Renders a live preview of the newsletter with auto-filled event data.
 * Supports all template section types and customization.
 */

import React from 'react';
import type { NewsletterTemplate, TemplateSection } from '../data/templates';
import type { Event } from '../data/events';
import type { Faculty } from '../data/faculty';

interface NewsletterPreviewProps {
  template: NewsletterTemplate;
  event: Event;
  attendingFaculty: Faculty[];
  customizations: {
    title?: string;
    summary?: string;
    selectedPhotos: string[];
    customQuotes: string[];
    highlights: string[];
  };
  onUpdateCustomization: (key: string, value: any) => void;
  isEditing?: boolean;
}

const NewsletterPreview: React.FC<NewsletterPreviewProps> = ({
  template,
  event,
  attendingFaculty,
  customizations,
  onUpdateCustomization,
  isEditing = false,
}) => {
  const { layout } = template;
  const { colorScheme } = layout;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get summary text (customized or from event)
  const summaryText = customizations.summary || event.archival?.summary || event.fullDescription || event.shortDescription;

  // Get photos to display
  const photos = customizations.selectedPhotos.length > 0 
    ? customizations.selectedPhotos 
    : (event.mediaLinks?.photos || []).slice(0, layout.maxPhotos);

  // Render individual section based on type
  const renderSection = (section: TemplateSection) => {
    switch (section.type) {
      case 'header':
        return (
          <div
            key={section.id}
            className="py-6 px-8"
            style={{
              backgroundColor: section.backgroundColor || colorScheme.primary,
              color: section.textColor || '#ffffff',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={section.title || template.name}
                    onChange={(e) => onUpdateCustomization(`section_${section.id}_title`, e.target.value)}
                    className="text-2xl font-bold bg-transparent border-b border-white/30 focus:border-white outline-none"
                    style={{ color: 'inherit' }}
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{section.title || template.name}</h1>
                )}
                {section.content && (
                  <p className="text-sm opacity-80 mt-1">{section.content}</p>
                )}
              </div>
              <div className="text-right text-sm opacity-80">
                <div>{formatDate(event.dateTime)}</div>
                <div>Issue #{Math.floor(Math.random() * 100) + 1}</div>
              </div>
            </div>
          </div>
        );

      case 'hero-image':
        const heroImage = photos[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop';
        return (
          <div key={section.id} className="relative">
            <img
              src={heroImage}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 50%, ${colorScheme.primary}cc)`,
              }}
            />
          </div>
        );

      case 'title-block':
        return (
          <div
            key={section.id}
            className="py-8 px-8"
            style={{
              backgroundColor: section.backgroundColor || '#ffffff',
              color: section.textColor || colorScheme.text,
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={customizations.title || event.title}
                onChange={(e) => onUpdateCustomization('title', e.target.value)}
                className="text-3xl font-bold w-full bg-transparent border-b-2 border-gray-200 focus:border-purple-500 outline-none pb-2"
              />
            ) : (
              <h2 className="text-3xl font-bold">{customizations.title || event.title}</h2>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm" style={{ color: colorScheme.muted }}>
              {section.showClub && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {event.club}
                </span>
              )}
              {section.showDate && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.dateTime)}
                </span>
              )}
              {section.showVenue && event.venue && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </span>
              )}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div
            key={section.id}
            className="py-6 px-8"
            style={{ backgroundColor: section.backgroundColor || '#ffffff' }}
          >
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            {isEditing ? (
              <textarea
                value={customizations.summary || summaryText}
                onChange={(e) => onUpdateCustomization('summary', e.target.value)}
                className="w-full min-h-[200px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm leading-relaxed"
                style={{ color: colorScheme.text }}
              />
            ) : (
              <p className="leading-relaxed whitespace-pre-line" style={{ color: colorScheme.text }}>
                {customizations.summary || summaryText}
              </p>
            )}
          </div>
        );

      case 'photo-grid':
      case 'photo-story':
        const gridPhotos = photos.slice(0, section.imageCount || 4);
        const columns = section.columns || 2;
        return (
          <div key={section.id} className="py-6 px-8">
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <div 
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {gridPhotos.map((photo, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={photo}
                    alt={`Event photo ${idx + 1}`}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'two-column':
        const twoColPhotos = photos.slice(0, section.imageCount || 4);
        return (
          <div key={section.id} className="py-6 px-8">
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-2 gap-4">
              {twoColPhotos.map((photo, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={photo}
                    alt={`Photo ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="text-sm" style={{ color: colorScheme.muted }}>
                    <p className="font-medium" style={{ color: colorScheme.text }}>Highlight {idx + 1}</p>
                    <p className="mt-1 line-clamp-3">A memorable moment from the event captured in pictures.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faculty-spotlight':
        if (attendingFaculty.length === 0) return null;
        return (
          <div key={section.id} className="py-6 px-8">
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {attendingFaculty.slice(0, 6).map((faculty) => (
                <div key={faculty.id} className="flex items-center gap-3">
                  <img
                    src={faculty.photoUrl}
                    alt={faculty.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm" style={{ color: colorScheme.text }}>
                      {faculty.name}
                    </p>
                    <p className="text-xs" style={{ color: colorScheme.muted }}>
                      {faculty.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quotes':
        const defaultQuotes = [
          "An incredibly enriching experience that exceeded all expectations.",
          "The event brought together brilliant minds and fostered meaningful discussions.",
        ];
        const quotes = customizations.customQuotes.length > 0 ? customizations.customQuotes : defaultQuotes;
        return (
          <div 
            key={section.id} 
            className="py-6 px-8"
            style={{ backgroundColor: `${colorScheme.accent}15` }}
          >
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <div className="space-y-4">
              {quotes.map((quote, idx) => (
                <blockquote 
                  key={idx}
                  className="pl-4 border-l-4 italic"
                  style={{ 
                    borderColor: colorScheme.accent,
                    color: colorScheme.text,
                  }}
                >
                  "{quote}"
                </blockquote>
              ))}
            </div>
          </div>
        );

      case 'highlights':
        const defaultHighlights = [
          "Engaging keynote sessions by industry experts",
          "Hands-on workshops with practical takeaways", 
          "Networking opportunities with peers and mentors",
          "Interactive Q&A sessions with panelists",
        ];
        const highlights = customizations.highlights.length > 0 ? customizations.highlights : defaultHighlights;
        return (
          <div key={section.id} className="py-6 px-8">
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: section.accentColor || colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <ul className="space-y-2">
              {highlights.map((highlight, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-2"
                  style={{ color: colorScheme.text }}
                >
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ 
                      backgroundColor: section.accentColor || colorScheme.accent,
                      color: '#ffffff',
                    }}
                  >
                    ✓
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'stats-block':
        const stats = [
          { label: 'Attendees', value: Math.floor(Math.random() * 200) + 50 },
          { label: 'Sessions', value: Math.floor(Math.random() * 10) + 3 },
          { label: 'Hours', value: Math.floor(Math.random() * 6) + 2 },
          { label: 'Photos', value: photos.length },
        ];
        return (
          <div 
            key={section.id} 
            className="py-6 px-8"
            style={{ backgroundColor: section.backgroundColor || `${colorScheme.primary}10` }}
          >
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: colorScheme.primary }}
              >
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-4 gap-4 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: colorScheme.primary }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colorScheme.muted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'event-details':
        return (
          <div key={section.id} className="py-6 px-8">
            {section.title && (
              <h3 
                className="text-lg font-semibold mb-4 pb-2 border-b-2"
                style={{ 
                  color: colorScheme.primary,
                  borderColor: colorScheme.accent,
                }}
              >
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="font-medium" style={{ color: colorScheme.text }}>Event Type:</span>
                  <span className="ml-2" style={{ color: colorScheme.muted }}>{event.type}</span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: colorScheme.text }}>Organized By:</span>
                  <span className="ml-2" style={{ color: colorScheme.muted }}>{event.club}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium" style={{ color: colorScheme.text }}>Date:</span>
                  <span className="ml-2" style={{ color: colorScheme.muted }}>{formatDate(event.dateTime)}</span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: colorScheme.text }}>Venue:</span>
                  <span className="ml-2" style={{ color: colorScheme.muted }}>{event.venue || 'Campus'}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <div 
            key={section.id} 
            className="py-4 px-6 mx-8 rounded-lg"
            style={{ backgroundColor: `${colorScheme.primary}10` }}
          >
            {section.title && (
              <h4 
                className="text-sm font-semibold mb-3"
                style={{ color: colorScheme.primary }}
              >
                {section.title}
              </h4>
            )}
            <ul className="space-y-2 text-sm" style={{ color: colorScheme.text }}>
              <li>📅 {formatDate(event.dateTime)}</li>
              <li>📍 {event.venue || 'Campus'}</li>
              <li>🏛️ {event.club}</li>
              <li>📸 {photos.length} photos captured</li>
            </ul>
          </div>
        );

      case 'call-to-action':
        return (
          <div 
            key={section.id} 
            className="py-8 px-8 text-center"
            style={{ 
              backgroundColor: section.backgroundColor || colorScheme.primary,
              color: section.textColor || '#ffffff',
            }}
          >
            <h3 className="text-xl font-bold mb-2">{section.title || 'Get Involved'}</h3>
            <p className="opacity-90 mb-4">{section.content || 'Join us for upcoming events'}</p>
            <button 
              className="px-6 py-2 rounded-full font-medium transition-transform hover:scale-105"
              style={{ 
                backgroundColor: colorScheme.accent,
                color: colorScheme.primary,
              }}
            >
              Learn More
            </button>
          </div>
        );

      case 'divider':
        return (
          <div key={section.id} className="px-8 py-4">
            <hr style={{ borderColor: colorScheme.muted, opacity: 0.3 }} />
          </div>
        );

      case 'footer':
        return (
          <div
            key={section.id}
            className="py-6 px-8 text-center text-sm"
            style={{
              backgroundColor: section.backgroundColor || colorScheme.primary,
              color: section.textColor || '#ffffff',
            }}
          >
            <p className="opacity-80">{section.content || 'Thank you for reading'}</p>
            <div className="mt-4 flex items-center justify-center gap-4 opacity-60">
              <span>📧 newsletter@college.edu</span>
              <span>🌐 college.edu</span>
            </div>
            <p className="mt-4 text-xs opacity-50">
              © {new Date().getFullYear()} College Event Portal. All rights reserved.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Sort sections by order
  const sortedSections = [...layout.sections].sort((a, b) => a.order - b.order);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto"
      style={{ fontFamily: layout.fontFamily }}
    >
      {sortedSections.map(renderSection)}
    </div>
  );
};

export default NewsletterPreview;
