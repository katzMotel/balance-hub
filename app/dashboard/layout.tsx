'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StoreProvider } from '@/store/StoreProvider';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectSidebarOpen, setSidebarOpen } from '@/store/slices/uiSlice';

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content wrapper - takes full width */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile backdrop - OUTSIDE and AFTER content */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          style={{ zIndex: 25 }}
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </StoreProvider>
  );
}