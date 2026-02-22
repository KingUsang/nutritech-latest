'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import TopBar from '@/components/layout/top-bar';
import BottomNav from '@/components/layout/bottom-nav';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function AuthenticatedLayout({ children }) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const userName =
    userProfile?.displayName ||
    userProfile?.full_name ||
    userProfile?.name ||
    user?.displayName ||
    user?.email?.split('@')[0] ||
    'Student';

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-tech-900">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-tech-900">
      <TopBar userName={userName} />
      <main className="pt-20 pb-24 px-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
