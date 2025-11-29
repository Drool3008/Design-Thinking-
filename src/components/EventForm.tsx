/**
 * EventForm Component
 * Form for creating and editing events in Event Group dashboard.
 * Part of Set 1 workflow - Event Group creates draft events, then publishes.
 */

import React, { useState } from 'react';
import type { Event, EventStatus } from '../data/events';
import { clubs, eventTypes } from '../data/events';

interface EventFormProps {
  event?: Event; // Existing event for editing, undefined for new event
  eventGroupId: string;
  onSave: (event: Partial<Event>) => void;
  onCancel: () => void;
  mode?: 'create' | 'edit';
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  eventGroupId,
  onSave,
  onCancel,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    club: event?.club || '',
    dateTime: event?.dateTime ? event.dateTime.slice(0, 16) : '', // Format for datetime-local input
    type: event?.type || '',
    shortDescription: event?.shortDescription || '',
    fullDescription: event?.fullDescription || '',
    venue: event?.venue || '',
    imageUrl: event?.imageUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    if (!formData.club) {
      newErrors.club = 'Please select a club';
    }
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time is required';
    }
    if (!formData.type) {
      newErrors.type = 'Please select an event type';
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = 'Short description must be under 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, status: EventStatus = 'draft') => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventData: Partial<Event> = {
      ...formData,
      status,
      eventGroupId,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    if (event?.id) {
      eventData.id = event.id;
    }

    onSave(eventData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {mode === 'create' ? 'Create New Event' : 'Edit Event'}
      </h2>

      <form onSubmit={(e) => handleSubmit(e, 'draft')} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Club and Type - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Club */}
          <div>
            <label htmlFor="club" className="block text-sm font-medium text-gray-700 mb-1">
              Club <span className="text-red-500">*</span>
            </label>
            <select
              id="club"
              name="club"
              value={formData.club}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.club ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a club</option>
              {clubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
            {errors.club && <p className="mt-1 text-sm text-red-500">{errors.club}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>
        </div>

        {/* Date/Time and Venue - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date and Time */}
          <div>
            <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.dateTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dateTime && <p className="mt-1 text-sm text-red-500">{errors.dateTime}</p>}
          </div>

          {/* Venue */}
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter venue"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description <span className="text-red-500">*</span>
            <span className="text-gray-400 font-normal ml-2">
              ({formData.shortDescription.length}/200)
            </span>
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief description for event cards (max 200 characters)"
            rows={2}
            maxLength={200}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
              errors.shortDescription ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.shortDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Full Description
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Detailed description for the event page (optional)"
            rows={5}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {formData.imageUrl && (
            <div className="mt-2">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'upcoming')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Publish to Website
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
