/**
 * Login Page
 * Simple login page with role selection.
 * Mock authentication - stores role in context and redirects to appropriate dashboard.
 */

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth, roleDisplayNames, roleDashboardPaths, type UserRole } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Exclude<UserRole, null>>('event-group');

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={getDashboardPath() || '/'} replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(roleDashboardPaths[selectedRole]);
  };

  const roles: Array<Exclude<UserRole, null>> = ['event-group', 'organiser', 'faculty', 'archiver'];

  // Role descriptions for better UX
  const roleDescriptions: Record<Exclude<UserRole, null>, string> = {
    'event-group': 'Create and manage your club/department events',
    'organiser': 'Review and approve events for scheduling',
    'faculty': 'Approve events requiring faculty authorization',
    'archiver': 'Manage past events and documentation',
  };

  // Role icons
  const roleIcons: Record<Exclude<UserRole, null>, React.ReactNode> = {
    'event-group': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'organiser': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    'faculty': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'archiver': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Select your role to continue to your dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role Selection */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            {roles.map((role) => (
              <label
                key={role}
                className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRole === role
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                  className="sr-only"
                />
                <div className={`flex-shrink-0 ${selectedRole === role ? 'text-blue-600' : 'text-gray-400'}`}>
                  {roleIcons[role]}
                </div>
                <div className="ml-3">
                  <div className={`font-medium ${selectedRole === role ? 'text-blue-900' : 'text-gray-900'}`}>
                    {roleDisplayNames[role]}
                  </div>
                  <div className="text-sm text-gray-500">{roleDescriptions[role]}</div>
                </div>
                {selectedRole === role && (
                  <svg className="w-5 h-5 text-blue-600 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Continue to Dashboard
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Demo Notice */}
          <p className="mt-4 text-center text-xs text-gray-500">
            This is a demo login. No real authentication is performed.
          </p>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
