/**
 * Authentication Context for the College Event Management Portal.
 * Manages user role state and provides authentication utilities.
 * 
 * Roles:
 * - event-group: Can create and manage their own events
 * - organiser: Can approve/reject events for scheduling
 * - faculty: Can approve/reject events requiring faculty approval
 * - archiver: Can archive past events and manage documentation
 */

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// User roles in the system
export type UserRole = 'event-group' | 'organiser' | 'faculty' | 'archiver' | null;

// Role display names for UI
export const roleDisplayNames: Record<Exclude<UserRole, null>, string> = {
  'event-group': 'Event Group',
  'organiser': 'Organiser',
  'faculty': 'Faculty',
  'archiver': 'Archiver',
};

// Dashboard paths for each role
export const roleDashboardPaths: Record<Exclude<UserRole, null>, string> = {
  'event-group': '/dashboard/event-group',
  'organiser': '/dashboard/organiser',
  'faculty': '/dashboard/faculty',
  'archiver': '/dashboard/archiver',
};

// Context type definition
interface AuthContextType {
  role: UserRole;
  isAuthenticated: boolean;
  login: (selectedRole: Exclude<UserRole, null>) => void;
  logout: () => void;
  getDashboardPath: () => string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize from localStorage if available (persistence across page reloads)
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || null;
  });

  const isAuthenticated = role !== null;

  // Login function - sets the user role
  const login = useCallback((selectedRole: Exclude<UserRole, null>) => {
    setRole(selectedRole);
    localStorage.setItem('userRole', selectedRole);
  }, []);

  // Logout function - clears the user role
  const logout = useCallback(() => {
    setRole(null);
    localStorage.removeItem('userRole');
  }, []);

  // Get the dashboard path for the current role
  const getDashboardPath = useCallback(() => {
    if (role) {
      return roleDashboardPaths[role];
    }
    return null;
  }, [role]);

  const value: AuthContextType = {
    role,
    isAuthenticated,
    login,
    logout,
    getDashboardPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
