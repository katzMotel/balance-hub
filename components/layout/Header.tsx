'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
 
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  toggleSidebar, 
  toggleTheme, 
  selectTheme,
  toggleUserMenu,
  selectUserMenuOpen,
  setUserMenuOpen
} from '@/store/slices/uiSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const pathname = usePathname();
  const userMenuOpen = useAppSelector(selectUserMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menu items array
  const menuItems = [
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Logout', icon: LogOut, onClick: () => alert('Logging out...') },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(setUserMenuOpen(false));
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen, dispatch]);

  const getTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/accounts') return 'Accounts';
    if (pathname === '/transactions') return 'Transactions';
    if (pathname === '/budgets') return 'Budgets';
    if (pathname === '/investments') return 'Investments';
    if (pathname === '/goals') return 'Goals';
    if (pathname === '/reports') return 'Reports';
    if (pathname === '/dashboard/settings') return 'Settings';
    
    return 'BalanceHub';
  };

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 dark:text-gray-300">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="mr-4 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">{getTitle()}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => dispatch(toggleUserMenu())}
              className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition-colors"
            >
              <span className="text-white text-sm font-medium">U</span>
            </button>

            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.onClick) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          dispatch(setUserMenuOpen(false));
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </button>
                    );
                  }

                  return (
                    <a                          // ← YOU'RE MISSING THIS!
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => dispatch(setUserMenuOpen(false))}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}