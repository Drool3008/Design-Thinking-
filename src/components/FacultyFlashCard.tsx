/**
 * FacultyFlashCard Component
 * Set 3: Hoverable card showing faculty details.
 * 
 * Features:
 * - Displays faculty name, department, lab, interests
 * - Shows photo, LinkedIn/homepage links
 * - Clean, academic styling like clubs.iiit.ac.in
 * - Option to request a meeting (for faculty users)
 */

import React, { useState } from 'react';
import type { Faculty } from '../data/faculty';

interface FacultyFlashCardProps {
  faculty: Faculty;
  onRequestMeeting?: (faculty: Faculty) => void;
  showMeetingButton?: boolean;
}

const FacultyFlashCard: React.FC<FacultyFlashCardProps> = ({ 
  faculty, 
  onRequestMeeting,
  showMeetingButton = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trigger - Faculty Name */}
      <button className="text-left font-medium text-gray-900 hover:text-indigo-600 transition-colors flex items-center gap-2">
        {faculty.photoUrl && (
          <img 
            src={faculty.photoUrl} 
            alt={faculty.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span>{faculty.name}</span>
      </button>

      {/* Hoverable Flash Card */}
      {isHovered && (
        <div className="absolute z-50 left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
            <div className="flex items-center gap-3">
              {faculty.photoUrl ? (
                <img 
                  src={faculty.photoUrl} 
                  alt={faculty.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white">
                  <span className="text-xl font-bold text-white">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-white">{faculty.name}</h3>
                <p className="text-sm text-indigo-100">{faculty.designation}</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3">
            {/* Department & Lab */}
            <div className="space-y-1">
              <div className="flex items-start gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-gray-600">{faculty.department}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-gray-600">{faculty.lab}</span>
              </div>
            </div>

            {/* Research Interests */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Research Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {faculty.interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              {faculty.email && (
                <a 
                  href={`mailto:${faculty.email}`}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {faculty.linkedinUrl && (
                <a 
                  href={faculty.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {faculty.homepageUrl && (
                <a 
                  href={faculty.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Homepage"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
              
              {/* Request Meeting Button */}
              {showMeetingButton && onRequestMeeting && (
                <button
                  onClick={() => onRequestMeeting(faculty)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Request Meeting
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyFlashCard;
