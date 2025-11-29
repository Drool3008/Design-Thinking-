/**
 * FilterBar Component
 * Filtering controls for events - Club, Date, Type (Set 1 workflow).
 * Design inspired by BookMyShow's filter interface.
 */

import React from 'react';
import { clubs, eventTypes } from '../data/events';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedClub: string;
  onClubChange: (club: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedClub,
  onClubChange,
  selectedType,
  onTypeChange,
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search events by name, description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Club Filter */}
          <select
            value={selectedClub}
            onChange={(e) => onClubChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Clubs</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>

          {/* Event Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Types</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />

          {/* Clear Filters Button */}
          {(searchQuery || selectedClub || selectedType || selectedDate) && (
            <button
              onClick={() => {
                onSearchChange('');
                onClubChange('');
                onTypeChange('');
                onDateChange('');
              }}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
