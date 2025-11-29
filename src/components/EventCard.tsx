/**
 * EventCard Component
 * Card component for displaying event information in a grid/list.
 * Design inspired by BookMyShow - image, title, club, type, date/time.
 * Updated for Set 1 workflow with status badges.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import type { Event, EventStatus } from '../data/events';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact';
  showStatus?: boolean; // Show status badge (for dashboards)
}

// Status badge colors for Set 1 + Set 2 workflow
const statusColors: Record<EventStatus, string> = {
  draft: 'bg-gray-100 text-gray-600 border border-gray-300',
  upcoming: 'bg-green-100 text-green-700 border border-green-300',
  ended: 'bg-blue-100 text-blue-700 border border-blue-300',
  archived: 'bg-purple-100 text-purple-700 border border-purple-300',
};

const statusLabels: Record<EventStatus, string> = {
  draft: 'Draft',
  upcoming: 'Upcoming',
  ended: 'Ended',
  archived: 'Archived',
};

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default', showStatus = false }) => {
  // Format datetime for display
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const dateFormatted = date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { date: dateFormatted, time: timeFormatted };
  };

  const { date, time } = formatDateTime(event.dateTime);

  // Default placeholder image if none provided
  const imageUrl = event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop';

  if (variant === 'compact') {
    return (
      <Link
        to={`/events/${event.id}`}
        className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
      >
        <img
          src={imageUrl}
          alt={event.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {date} • {time}
          </p>
          <p className="text-xs text-blue-600">{event.club}</p>
        </div>
        {showStatus && (
          <span className={`px-2 py-1 text-xs rounded-md ${statusColors[event.status]}`}>
            {statusLabels[event.status]}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Event Type Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
          {event.type}
        </span>
        {/* Status Badge */}
        {showStatus && (
          <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-md ${statusColors[event.status]}`}>
            {statusLabels[event.status]}
          </span>
        )}
        {/* Ended badge with gallery indicator */}
        {event.status === 'ended' && event.mediaLinks && (event.mediaLinks.photos.length > 0 || event.mediaLinks.videos.length > 0) && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 text-gray-700 text-xs rounded-md flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Gallery
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.shortDescription}
        </p>

        {/* Date, Time, Venue */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date} • {time}
          </div>
          {event.venue && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.venue}
            </div>
          )}
        </div>

        {/* Club */}
        <div className="pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-blue-600">{event.club}</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
