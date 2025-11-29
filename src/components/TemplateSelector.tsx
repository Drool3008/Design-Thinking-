/**
 * TemplateSelector Component - Set 5
 * 
 * UI for browsing, selecting, and previewing newsletter templates.
 * Supports predefined templates and custom template uploads.
 */

import React, { useState } from 'react';
import { predefinedTemplates, blankTemplate } from '../data/templates';
import type { NewsletterTemplate } from '../data/templates';

interface TemplateSelectorProps {
  selectedTemplateId: string | null;
  onSelectTemplate: (template: NewsletterTemplate) => void;
  customTemplates: NewsletterTemplate[];
  onAddCustomTemplate: (template: NewsletterTemplate) => void;
}

const categoryLabels: Record<NewsletterTemplate['category'], string> = {
  modern: 'Modern',
  academic: 'Academic',
  magazine: 'Magazine',
  'photo-centric': 'Photo-Centric',
  minimal: 'Minimal',
  formal: 'Formal',
};

const categoryColors: Record<NewsletterTemplate['category'], string> = {
  modern: 'bg-blue-100 text-blue-700',
  academic: 'bg-green-100 text-green-700',
  magazine: 'bg-purple-100 text-purple-700',
  'photo-centric': 'bg-pink-100 text-pink-700',
  minimal: 'bg-gray-100 text-gray-700',
  formal: 'bg-indigo-100 text-indigo-700',
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  customTemplates,
  onAddCustomTemplate,
}) => {
  const [activeCategory, setActiveCategory] = useState<NewsletterTemplate['category'] | 'all' | 'custom'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplateJson, setNewTemplateJson] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Combine predefined and custom templates
  const allTemplates = [...predefinedTemplates, ...customTemplates];
  
  // Filter templates by category
  const filteredTemplates = activeCategory === 'all' 
    ? allTemplates 
    : activeCategory === 'custom'
    ? customTemplates
    : allTemplates.filter(t => t.category === activeCategory);

  const categories: (NewsletterTemplate['category'] | 'all' | 'custom')[] = [
    'all', 'modern', 'academic', 'magazine', 'photo-centric', 'minimal', 'formal', 'custom'
  ];

  const handleAddCustomTemplate = () => {
    setJsonError('');
    try {
      const parsed = JSON.parse(newTemplateJson);
      
      // Validate basic structure
      if (!parsed.name || !parsed.layout || !parsed.layout.sections) {
        throw new Error('Template must have name and layout with sections');
      }

      const newTemplate: NewsletterTemplate = {
        ...blankTemplate,
        ...parsed,
        id: `custom-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };

      onAddCustomTemplate(newTemplate);
      setShowAddModal(false);
      setNewTemplateJson('');
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : 'Invalid JSON format');
    }
  };

  const handleCreateBlank = () => {
    const newTemplate: NewsletterTemplate = {
      ...blankTemplate,
      id: `custom-${Date.now()}`,
      name: `Custom Template ${customTemplates.length + 1}`,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };
    onAddCustomTemplate(newTemplate);
    onSelectTemplate(newTemplate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Choose a Template</h3>
          <p className="text-sm text-gray-500 mt-1">
            Select a template to generate your newsletter draft
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Template
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Templates' : cat === 'custom' ? 'My Templates' : categoryLabels[cat]}
            {cat === 'custom' && customTemplates.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">
                {customTemplates.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Blank Template Card */}
        {activeCategory === 'all' || activeCategory === 'custom' ? (
          <button
            onClick={handleCreateBlank}
            className="group relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center justify-center min-h-[240px]"
          >
            <div className="w-16 h-16 bg-gray-200 group-hover:bg-purple-200 rounded-full flex items-center justify-center mb-4 transition-colors">
              <svg className="w-8 h-8 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-medium text-gray-600 group-hover:text-purple-700">Create Blank Template</span>
            <span className="text-sm text-gray-400 mt-1">Start from scratch</span>
          </button>
        ) : null}

        {/* Template Cards */}
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`group relative bg-white rounded-xl overflow-hidden border-2 transition-all text-left ${
              selectedTemplateId === template.id
                ? 'border-purple-500 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative h-36 bg-gray-100 overflow-hidden">
              {template.thumbnailUrl ? (
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: template.layout.colorScheme.primary }}
                >
                  <span className="text-3xl font-bold" style={{ color: template.layout.colorScheme.accent }}>
                    {template.name.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Selected Indicator */}
              {selectedTemplateId === template.id && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Custom Badge */}
              {template.isCustom && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded">
                  Custom
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                  {template.name}
                </h4>
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${categoryColors[template.category]}`}>
                  {categoryLabels[template.category]}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
              
              {/* Features */}
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {template.layout.maxPhotos} photos
                </span>
                {template.layout.showFacultySection && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    Faculty
                  </span>
                )}
                {template.layout.showQuotes && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    Quotes
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State for Custom Templates */}
      {activeCategory === 'custom' && customTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-2">No custom templates yet</h4>
          <p className="text-sm text-gray-500 mb-4">Create a new template or upload a JSON template file</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Your First Template
          </button>
        </div>
      )}

      {/* Add Template Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAddModal(false)} />
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Add New Template</h3>
                <p className="text-sm text-gray-500 mt-1">Create a custom template or import from JSON</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleCreateBlank();
                    setShowAddModal(false);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Start Blank</h4>
                  <p className="text-sm text-gray-500 mt-1">Create a new template from scratch</p>
                </button>

                <button
                  onClick={() => {
                    // Copy a predefined template
                    const copy = {
                      ...predefinedTemplates[0],
                      id: `custom-${Date.now()}`,
                      name: `Copy of ${predefinedTemplates[0].name}`,
                      isCustom: true,
                      createdAt: new Date().toISOString(),
                    };
                    onAddCustomTemplate(copy);
                    onSelectTemplate(copy);
                    setShowAddModal(false);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">Duplicate Existing</h4>
                  <p className="text-sm text-gray-500 mt-1">Start from an existing template</p>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">or import JSON</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* JSON Import */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Template JSON
                </label>
                <textarea
                  value={newTemplateJson}
                  onChange={(e) => setNewTemplateJson(e.target.value)}
                  placeholder={`{
  "name": "My Custom Template",
  "description": "Description here",
  "category": "custom",
  "layout": {
    "sections": [...],
    "colorScheme": {...},
    "fontFamily": "...",
    ...
  }
}`}
                  className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {jsonError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {jsonError}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomTemplate}
                disabled={!newTemplateJson.trim()}
                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Import Template
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSelector;
