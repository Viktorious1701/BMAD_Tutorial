'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, CreditCard, ArrowLeftRight, Waves } from 'lucide-react';
import { WaveRipple, FloatingElement } from './particle-effects';

const navigationItems = [
  {
    name: 'Bảng Điều Khiển',
    href: '/',
    icon: Home,
  },
  {
    name: 'Tài Khoản',
    href: '/accounts',
    icon: CreditCard,
  },
  {
    name: 'Giao Dịch',
    href: '/transactions',
    icon: ArrowLeftRight,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="organic-card backdrop-blur-lg border-0 shadow-xl relative z-20 mx-4 mt-4 mb-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <FloatingElement>
              <div className="flex-shrink-0 flex items-center">
                <Waves className="w-8 h-8 mr-3 text-blue-600" style={{color: 'var(--ocean-medium)'}} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Ocean Wallet
                </h1>
              </div>
            </FloatingElement>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <WaveRipple key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden',
                        isActive
                          ? 'ocean-gradient text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-white/50 hover:text-blue-600 hover:scale-105'
                      )}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </Link>
                  </WaveRipple>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-4 pb-6 space-y-2 px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <WaveRipple key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 relative overflow-hidden',
                    isActive
                      ? 'ocean-gradient text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/60 hover:text-blue-600'
                  )}
                >
                  <Icon className="w-6 h-6 mr-4" />
                  {item.name}
                </Link>
              </WaveRipple>
            );
          })}
        </div>
      </div>
    </nav>
  );
}