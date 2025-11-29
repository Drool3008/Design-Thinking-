/**
 * FacultyAttendanceManager Component
 * Set 3: Allows Event Group to mark faculty attendance for events.
 * 
 * Features:
 * - Lists all registered faculty
 * - Checkbox/toggle to mark attendance
 * - Search/filter faculty
 * - Shows attendance count
 */

import React, { useState, useMemo } from 'react';
import { facultyMembers } from '../data/faculty';
import type { FacultyAttendance } from '../data/events';

interface FacultyAttendanceManagerProps {
  attendance: FacultyAttendance;
  onAttendanceChange: (attendance: FacultyAttendance) => void;
  readOnly?: boolean;
}

const FacultyAttendanceManager: React.FC<FacultyAttendanceManagerProps> = ({
  attendance,
  onAttendanceChange,
  readOnly = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAttended, setShowOnlyAttended] = useState(false);

  // Filter faculty based on search
  const filteredFaculty = useMemo(() => {
    let result = facultyMembers;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.department.toLowerCase().includes(query)
      );
    }
    
    if (showOnlyAttended) {
      result = result.filter(f => attendance[f.id] === true);
    }
    
    return result;
  }, [searchQuery, showOnlyAttended, attendance]);

  // Count attended
  const attendedCount = useMemo(() => 
    Object.values(attendance).filter(Boolean).length,
    [attendance]
  );

  // Toggle attendance for a faculty member
  const toggleAttendance = (facultyId: string) => {
    if (readOnly) return;
    
    const newAttendance = {
      ...attendance,
      [facultyId]: !attendance[facultyId],
    };
    onAttendanceChange(newAttendance);
  };

  // Mark all as attended/not attended
  const markAll = (attended: boolean) => {
    if (readOnly) return;
    
    const newAttendance: FacultyAttendance = {};
    filteredFaculty.forEach(f => {
      newAttendance[f.id] = attended;
    });
    onAttendanceChange({ ...attendance, ...newAttendance });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Faculty Attendance</h3>
            <p className="text-sm text-gray-500">
              {attendedCount} of {facultyMembers.length} faculty attended
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-indigo-600">{attendedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-4 border-b border-gray-200 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name or department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyAttended}
              onChange={(e) => setShowOnlyAttended(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Show attended only
          </label>
        </div>

        {/* Quick Actions */}
        {!readOnly && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => markAll(true)}
              className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll(false)}
              className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
            >
              Mark All Absent
            </button>
          </div>
        )}
      </div>

      {/* Faculty List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredFaculty.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>No faculty found matching your criteria</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredFaculty.map((faculty) => {
              const isAttended = attendance[faculty.id] === true;
              
              return (
                <li 
                  key={faculty.id}
                  className={`px-6 py-4 flex items-center gap-4 transition-colors ${
                    readOnly ? '' : 'hover:bg-gray-50 cursor-pointer'
                  } ${isAttended ? 'bg-green-50/50' : ''}`}
                  onClick={() => toggleAttendance(faculty.id)}
                >
                  {/* Checkbox/Status */}
                  <div className="flex-shrink-0">
                    {readOnly ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isAttended ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {isAttended ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={isAttended}
                        onChange={() => {}}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    )}
                  </div>

                  {/* Faculty Photo */}
                  {faculty.photoUrl ? (
                    <img
                      src={faculty.photoUrl}
                      alt={faculty.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-indigo-600">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}

                  {/* Faculty Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{faculty.name}</p>
                    <p className="text-xs text-gray-500 truncate">{faculty.department}</p>
                  </div>

                  {/* Lab */}
                  <div className="hidden sm:block text-xs text-gray-500 max-w-[150px] truncate">
                    {faculty.lab}
                  </div>

                  {/* Status Badge */}
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isAttended 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isAttended ? 'Present' : 'Absent'}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {filteredFaculty.length} of {facultyMembers.length} faculty
          </span>
          <div className="flex items-center gap-4">
            <span className="text-green-600">
              ✓ {attendedCount} Present
            </span>
            <span className="text-gray-500">
              ✗ {facultyMembers.length - attendedCount} Absent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAttendanceManager;
