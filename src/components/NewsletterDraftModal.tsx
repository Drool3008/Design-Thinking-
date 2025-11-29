import React, { useState, useMemo } from 'react';
import type { Event } from '../data/events';
import type { Faculty } from '../data/faculty';
import { predefinedTemplates, type NewsletterTemplate } from '../data/templates';
import TemplateSelector from './TemplateSelector';
import NewsletterPreview from './NewsletterPreview';

interface NewsletterDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  faculty: Faculty[];
}

interface NewsletterCustomizations {
  title: string;
  summary: string;
  selectedPhotos: string[];
  customQuotes: string[];
  highlights: string[];
}

interface GeneratedDraft {
  templateId: string;
  subject: string;
  bodyHtml: string;
  recipients: {
    to: string[];
    cc: string[];
    bcc: string[];
  };
  attachments: { name: string; url: string }[];
  generatedAt: string;
}

type ViewMode = 'select' | 'customize' | 'export';

export default function NewsletterDraftModal({ isOpen, onClose, event, faculty }: NewsletterDraftModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('select');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [customTemplates, setCustomTemplates] = useState<NewsletterTemplate[]>([]);
  const [customizations, setCustomizations] = useState<NewsletterCustomizations>({
    title: '',
    summary: '',
    selectedPhotos: [],
    customQuotes: [],
    highlights: [],
  });
  const [generatedDraft, setGeneratedDraft] = useState<GeneratedDraft | null>(null);
  const [newQuote, setNewQuote] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  // Get photos from event media
  const eventPhotos = event.mediaLinks?.photos || [];

  // Get faculty attending this event
  const attendingFaculty = faculty.filter((f) => event.facultyAttendance?.[f.id]);

  // Initialize customizations from event data
  React.useEffect(() => {
    if (event) {
      setCustomizations({
        title: event.title,
        summary: event.archival?.summary || event.fullDescription || event.shortDescription,
        selectedPhotos: eventPhotos,
        customQuotes: [],
        highlights: [],
      });
    }
  }, [event]);

  // Get selected template
  const selectedTemplate = useMemo(() => {
    if (!selectedTemplateId) return null;
    return [...predefinedTemplates, ...customTemplates].find((t) => t.id === selectedTemplateId) || null;
  }, [selectedTemplateId, customTemplates]);

  // Handle template selection
  const handleSelectTemplate = (template: NewsletterTemplate) => {
    setSelectedTemplateId(template.id);
    setViewMode('customize');
  };

  // Handle adding custom template
  const handleAddCustomTemplate = (template: NewsletterTemplate) => {
    setCustomTemplates((prev) => [...prev, template]);
  };

  // Handle photo toggle
  const handlePhotoToggle = (photoUrl: string) => {
    setCustomizations((prev) => ({
      ...prev,
      selectedPhotos: prev.selectedPhotos.includes(photoUrl)
        ? prev.selectedPhotos.filter((p) => p !== photoUrl)
        : [...prev.selectedPhotos, photoUrl],
    }));
  };

  // Handle adding quote
  const handleAddQuote = () => {
    if (newQuote.trim()) {
      setCustomizations((prev) => ({
        ...prev,
        customQuotes: [...prev.customQuotes, newQuote.trim()],
      }));
      setNewQuote('');
    }
  };

  // Handle removing quote
  const handleRemoveQuote = (index: number) => {
    setCustomizations((prev) => ({
      ...prev,
      customQuotes: prev.customQuotes.filter((_, i) => i !== index),
    }));
  };

  // Handle adding highlight
  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setCustomizations((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
      }));
      setNewHighlight('');
    }
  };

  // Handle removing highlight
  const handleRemoveHighlight = (index: number) => {
    setCustomizations((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // Handle customization update (for NewsletterPreview)
  const handleUpdateCustomization = (key: string, value: unknown) => {
    setCustomizations((prev) => ({ ...prev, [key]: value }));
  };

  // Generate newsletter HTML
  const generateNewsletterHtml = (): string => {
    if (!selectedTemplate) return '';

    const { colorScheme } = selectedTemplate.layout;
    const photos = customizations.selectedPhotos;

    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${customizations.title}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: ${colorScheme.background}; color: ${colorScheme.text}; }
    .container { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: ${colorScheme.primary}; color: white; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .hero-image { width: 100%; height: 300px; object-fit: cover; }
    .content { padding: 32px; }
    .section { margin-bottom: 32px; }
    .section-title { color: ${colorScheme.primary}; font-size: 20px; font-weight: 600; margin-bottom: 16px; border-bottom: 2px solid ${colorScheme.accent}; padding-bottom: 8px; }
    .event-meta { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 24px; color: #666; }
    .summary { font-size: 16px; line-height: 1.7; color: #444; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
    .gallery img { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; }
    .faculty-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .faculty-card { background: ${colorScheme.background}; padding: 16px; border-radius: 8px; text-align: center; }
    .faculty-avatar { width: 64px; height: 64px; border-radius: 50%; background: ${colorScheme.primary}; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; margin: 0 auto 12px; }
    .highlights-list { list-style: none; padding: 0; }
    .highlights-list li { padding: 12px 16px; background: ${colorScheme.background}; margin-bottom: 8px; border-radius: 6px; border-left: 4px solid ${colorScheme.accent}; }
    .quote-box { background: linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.accent}15); padding: 24px; border-radius: 8px; font-style: italic; font-size: 18px; border-left: 4px solid ${colorScheme.primary}; margin-bottom: 16px; }
    .footer { background: #1a1a1a; color: white; padding: 24px 32px; text-align: center; }
    .footer a { color: ${colorScheme.accent}; }
  </style>
</head>
<body>
  <div class="container">
`;

    // Generate sections based on template layout
    selectedTemplate.layout.sections.forEach((section) => {
      switch (section.type) {
        case 'header':
          html += `
    <div class="header">
      <h1>${customizations.title}</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">College Newsletter</p>
    </div>
`;
          break;

        case 'hero-image':
          if (photos.length > 0) {
            html += `
    <img src="${photos[0]}" alt="Event Hero" class="hero-image">
`;
          }
          break;

        case 'summary':
          html += `
    <div class="content">
      <div class="event-meta">
        <span>📅 ${new Date(event.dateTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span>📍 ${event.venue || 'TBD'}</span>
        <span>🏛️ ${event.club}</span>
      </div>
      <div class="section">
        <h2 class="section-title">Event Summary</h2>
        <p class="summary">${customizations.summary}</p>
      </div>
`;
          break;

        case 'photo-grid':
          if (photos.length > 1) {
            html += `
      <div class="section">
        <h2 class="section-title">Photo Gallery</h2>
        <div class="gallery">
          ${photos.slice(1, 7).map((p) => `<img src="${p}" alt="Event Photo">`).join('\n          ')}
        </div>
      </div>
`;
          }
          break;

        case 'faculty-spotlight':
          if (attendingFaculty.length > 0) {
            html += `
      <div class="section">
        <h2 class="section-title">Faculty Present</h2>
        <div class="faculty-grid">
          ${attendingFaculty
            .map(
              (f) => `
          <div class="faculty-card">
            <div class="faculty-avatar">${f.name.charAt(0)}</div>
            <div style="font-weight: 600;">${f.name}</div>
            <div style="font-size: 14px; color: #666;">${f.designation}</div>
          </div>`
            )
            .join('')}
        </div>
      </div>
`;
          }
          break;

        case 'highlights':
          if (customizations.highlights.length > 0) {
            html += `
      <div class="section">
        <h2 class="section-title">Key Highlights</h2>
        <ul class="highlights-list">
          ${customizations.highlights.map((h) => `<li>${h}</li>`).join('\n          ')}
        </ul>
      </div>
`;
          }
          break;

        case 'quotes':
          if (customizations.customQuotes.length > 0) {
            html += `
      <div class="section">
        <h2 class="section-title">Testimonials</h2>
        ${customizations.customQuotes.map((q) => `<div class="quote-box">"${q}"</div>`).join('\n        ')}
      </div>
`;
          }
          break;

        case 'footer':
          html += `
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px;">This newsletter was automatically generated for <strong>${event.eventGroupId}</strong></p>
      <p style="margin: 0; font-size: 14px; opacity: 0.8;">© ${new Date().getFullYear()} College Events Portal</p>
    </div>
`;
          break;
      }
    });

    html += `
  </div>
</body>
</html>`;

    return html;
  };

  // Generate newsletter draft
  const handleGenerateDraft = () => {
    if (!selectedTemplate) return;

    const bodyHtml = generateNewsletterHtml();

    const draft: GeneratedDraft = {
      templateId: selectedTemplate.id,
      subject: `[Newsletter] ${customizations.title} - ${event.club}`,
      bodyHtml,
      recipients: {
        to: ['college-announcements@university.edu'],
        cc: attendingFaculty.map((f) => `${f.name.toLowerCase().replace(/\s+/g, '.')}@university.edu`),
        bcc: ['communications@university.edu'],
      },
      attachments: customizations.selectedPhotos.map((url, i) => ({
        name: `event-photo-${i + 1}.jpg`,
        url,
      })),
      generatedAt: new Date().toISOString(),
    };

    setGeneratedDraft(draft);
    setViewMode('export');
  };

  // Copy HTML to clipboard
  const handleCopyHtml = async () => {
    if (generatedDraft) {
      await navigator.clipboard.writeText(generatedDraft.bodyHtml);
      alert('Newsletter HTML copied to clipboard!');
    }
  };

  // Copy draft JSON to clipboard
  const handleCopyDraft = async () => {
    if (generatedDraft) {
      await navigator.clipboard.writeText(JSON.stringify(generatedDraft, null, 2));
      alert('Draft JSON copied to clipboard!');
    }
  };

  // Download HTML file
  const handleDownloadHtml = () => {
    if (generatedDraft) {
      const blob = new Blob([generatedDraft.bodyHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `newsletter-${event.id}-${Date.now()}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Newsletter Draft Generator</h2>
            <p className="text-purple-200 text-sm">Create a publication-ready newsletter for "{event.title}"</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex items-center justify-center gap-4">
            {[
              { id: 'select', label: '1. Select Template', icon: '📋' },
              { id: 'customize', label: '2. Customize', icon: '✏️' },
              { id: 'export', label: '3. Export', icon: '📤' },
            ].map((step, i) => (
              <React.Fragment key={step.id}>
                {i > 0 && <div className="w-12 h-0.5 bg-gray-300" />}
                <button
                  onClick={() => {
                    if (step.id === 'select') setViewMode('select');
                    else if (step.id === 'customize' && selectedTemplate) setViewMode('customize');
                    else if (step.id === 'export' && generatedDraft) setViewMode('export');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{step.icon}</span>
                  <span className="font-medium">{step.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Step 1: Template Selection */}
          {viewMode === 'select' && (
            <div className="p-6">
              <TemplateSelector
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={handleSelectTemplate}
                customTemplates={customTemplates}
                onAddCustomTemplate={handleAddCustomTemplate}
              />
            </div>
          )}

          {/* Step 2: Customization */}
          {viewMode === 'customize' && selectedTemplate && (
            <div className="flex h-full">
              {/* Customization Panel */}
              <div className="w-1/2 p-6 border-r overflow-y-auto max-h-[60vh]">
                <h3 className="text-lg font-semibold mb-4">Customize Newsletter</h3>

                {/* Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter Title</label>
                  <input
                    type="text"
                    value={customizations.title}
                    onChange={(e) => setCustomizations((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Summary</label>
                  <textarea
                    value={customizations.summary}
                    onChange={(e) => setCustomizations((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Photo Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Photos ({customizations.selectedPhotos.length} selected)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {eventPhotos.map((photo: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handlePhotoToggle(photo)}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          customizations.selectedPhotos.includes(photo)
                            ? 'border-purple-500 ring-2 ring-purple-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        {customizations.selectedPhotos.includes(photo) && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Highlights</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddHighlight()}
                      placeholder="Add a highlight..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={handleAddHighlight}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {customizations.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="flex-1">{h}</span>
                        <button
                          onClick={() => handleRemoveHighlight(i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quotes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials / Quotes</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddQuote()}
                      placeholder="Add a quote..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={handleAddQuote}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {customizations.customQuotes.map((q, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="flex-1 italic">"{q}"</span>
                        <button
                          onClick={() => handleRemoveQuote(i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateDraft}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Generate Newsletter Draft →
                </button>
              </div>

              {/* Preview Panel */}
              <div className="w-1/2 bg-gray-100 p-6 overflow-y-auto max-h-[60vh]">
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <NewsletterPreview
                    template={selectedTemplate}
                    event={event}
                    attendingFaculty={attendingFaculty}
                    customizations={customizations}
                    onUpdateCustomization={handleUpdateCustomization}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Export */}
          {viewMode === 'export' && generatedDraft && (
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Newsletter Draft Ready!</h3>
                      <p className="text-green-600 text-sm">
                        Generated at {new Date(generatedDraft.generatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Draft Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                      <div className="bg-white px-4 py-2 rounded-lg border">{generatedDraft.subject}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                      <div className="bg-white px-4 py-3 rounded-lg border space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">To:</span> {generatedDraft.recipients.to.join(', ')}
                        </div>
                        {generatedDraft.recipients.cc.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">CC:</span> {generatedDraft.recipients.cc.join(', ')}
                          </div>
                        )}
                        {generatedDraft.recipients.bcc.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">BCC:</span> {generatedDraft.recipients.bcc.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Attachments ({generatedDraft.attachments.length})
                      </label>
                      <div className="bg-white px-4 py-3 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                          {generatedDraft.attachments.map((att, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                              📎 {att.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={handleCopyHtml}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy HTML
                  </button>
                  <button
                    onClick={handleCopyDraft}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Copy JSON
                  </button>
                  <button
                    onClick={handleDownloadHtml}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download HTML
                  </button>
                </div>

                {/* HTML Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HTML Preview</label>
                  <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                      {generatedDraft.bodyHtml.slice(0, 1500)}...
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          <button
            onClick={() => {
              if (viewMode === 'customize') setViewMode('select');
              else if (viewMode === 'export') setViewMode('customize');
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'select'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            disabled={viewMode === 'select'}
          >
            ← Back
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
