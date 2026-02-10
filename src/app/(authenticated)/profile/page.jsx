'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { logoutUser } from '@/lib/auth-helpers';
import GlassCard from '@/components/ui/glass-card';
import GlassButton from '@/components/ui/glass-button';
import InputField from '@/components/ui/input-field';

/**
 * Profile page - User settings and preferences
 */
export default function ProfilePage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-tech-primary to-emerald-600 flex items-center justify-center text-3xl font-bold text-navy-900">
          {userProfile?.displayName?.charAt(0) || 'U'}
        </div>
        <h1 className="text-2xl font-bold mb-1">{userProfile?.displayName || 'User'}</h1>
        <p className="text-sm text-gray-400">{user?.email}</p>
      </div>

      {/* Profile Info */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold">Profile Information</h3>
          <GlassButton variant="secondary" size="sm" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit'}
          </GlassButton>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Age</div>
              <div className="font-medium">{userProfile?.age || '20'} years</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Weight</div>
              <div className="font-medium">{userProfile?.weight || '70'} kg</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Height</div>
              <div className="font-medium">{userProfile?.height || '170'} cm</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">University</div>
              <div className="font-medium">{userProfile?.university || 'UI'}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-1">Activity Level</div>
            <div className="font-medium capitalize">
              {userProfile?.activityLevel || 'Moderate'}
            </div>
          </div>
        </div>

        {editing && (
          <div className="mt-6">
            <GlassButton variant="primary" fullWidth>
              Save Changes
            </GlassButton>
          </div>
        )}
      </GlassCard>

      {/* Health Goals */}
      <GlassCard className="p-6">
        <h3 className="font-bold mb-4">Health Goals</h3>
        <div className="flex flex-wrap gap-2">
          {['Build Muscle', 'Boost Energy', 'Better Focus'].map((goal) => (
            <div
              key={goal}
              className="px-4 py-2 rounded-full bg-tech-primary/20 text-tech-primary text-sm"
            >
              {goal}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard className="p-6">
        <h3 className="font-bold mb-4">Preferences</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Daily Budget</div>
              <div className="text-sm text-gray-400">₦1,000 per day</div>
            </div>
            <GlassButton variant="ghost" size="sm">
              Edit
            </GlassButton>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Diet Type</div>
              <div className="text-sm text-gray-400">Balanced</div>
            </div>
            <GlassButton variant="ghost" size="sm">
              Edit
            </GlassButton>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Allergies</div>
              <div className="text-sm text-gray-400">None</div>
            </div>
            <GlassButton variant="ghost" size="sm">
              Edit
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard className="p-6 border border-red-500/20">
        <h3 className="font-bold mb-4 text-red-400">Account Actions</h3>
        <div className="space-y-3">
          <GlassButton variant="danger" fullWidth onClick={handleLogout}>
            Sign Out
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}
