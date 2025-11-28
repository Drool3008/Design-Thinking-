/**
 * RoleBadge Component
 * Displays the current user's role in a badge format.
 * Color-coded based on role type for quick identification.
 */

import type { UserRole } from '../context/AuthContext';
import { roleDisplayNames } from '../context/AuthContext';

interface RoleBadgeProps {
  role: Exclude<UserRole, null>;
  size?: 'sm' | 'md' | 'lg';
}

// Role-specific colors for visual distinction
const roleColors: Record<Exclude<UserRole, null>, string> = {
  'event-group': 'bg-purple-100 text-purple-700 border-purple-200',
  'organiser': 'bg-green-100 text-green-700 border-green-200',
  'faculty': 'bg-blue-100 text-blue-700 border-blue-200',
  'archiver': 'bg-amber-100 text-amber-700 border-amber-200',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${roleColors[role]} ${sizeClasses[size]}`}
    >
      {roleDisplayNames[role]}
    </span>
  );
}

export default RoleBadge;
