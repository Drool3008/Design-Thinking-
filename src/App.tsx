/**
 * App.tsx - Main Application Component
 * Sets up routing with React Router and includes protected route logic.
 * 
 * Route Structure:
 * - / : Public landing page (viewers)
 * - /events/:eventId : Event detail page
 * - /login : Login page with role selection
 * - /dashboard/event-group : Event Group dashboard
 * - /dashboard/organiser : Organiser dashboard
 * - /dashboard/faculty : Faculty dashboard
 * - /dashboard/archiver : Archiver dashboard
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, type UserRole } from './context/AuthContext';

// Layout
import Layout from './components/Layout';

// Public Routes
import LandingPage from './routes/LandingPage';
import EventDetailPage from './routes/EventDetailPage';
import LoginPage from './routes/LoginPage';

// Dashboard Routes
import DashboardEventGroup from './routes/DashboardEventGroup';
import DashboardOrganiser from './routes/DashboardOrganiser';
import DashboardFaculty from './routes/DashboardFaculty';
import DashboardArchiver from './routes/DashboardArchiver';
import ArchiverEventPage from './routes/ArchiverEventPage';

/**
 * Protected Route Component
 * Redirects unauthenticated users to login.
 * Redirects users to their own dashboard if trying to access another role's dashboard.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: Exclude<UserRole, null>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, role, getDashboardPath } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but wrong role, redirect to own dashboard
  if (role !== allowedRole) {
    return <Navigate to={getDashboardPath() || '/'} replace />;
  }

  return <>{children}</>;
};

/**
 * App Routes Component
 * Contains all route definitions wrapped in the router.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes with shared layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
      </Route>

      {/* Login page (no layout) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected dashboard routes with shared layout */}
      <Route path="/dashboard" element={<Layout />}>
        {/* Event Group Dashboard */}
        <Route
          path="event-group"
          element={
            <ProtectedRoute allowedRole="event-group">
              <DashboardEventGroup />
            </ProtectedRoute>
          }
        />

        {/* Organiser Dashboard */}
        <Route
          path="organiser"
          element={
            <ProtectedRoute allowedRole="organiser">
              <DashboardOrganiser />
            </ProtectedRoute>
          }
        />

        {/* Faculty Dashboard */}
        <Route
          path="faculty"
          element={
            <ProtectedRoute allowedRole="faculty">
              <DashboardFaculty />
            </ProtectedRoute>
          }
        />

        {/* Archiver Dashboard */}
        <Route
          path="archiver"
          element={
            <ProtectedRoute allowedRole="archiver">
              <DashboardArchiver />
            </ProtectedRoute>
          }
        />

        {/* Archiver Event Management Page */}
        <Route
          path="archiver/:eventId"
          element={
            <ProtectedRoute allowedRole="archiver">
              <ArchiverEventPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect /dashboard to login if no specific route */}
        <Route index element={<Navigate to="/login" replace />} />
      </Route>

      {/* Catch-all redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Main App Component
 * Wraps the application with AuthProvider and BrowserRouter.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
