'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Layers,
  Settings,
} from 'lucide-react';

export default function DashSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Assets', href: '/dashboard/assets', icon: ImageIcon },
    { name: 'Templates', href: '/dashboard/templates', icon: Layers },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col h-full p-4 space-y-4 bg-[#140b36] w-64">

      {/* Header */}
      <div className="px-2 py-4">
        <h2 className="text-lg font-bold text-[#e9e1ff] font-headline">
          Recent
        </h2>
        <p className="text-xs uppercase tracking-widest text-[#4a426b]">
          Generations
        </p>
      </div>

      {/* New Project */}
      <button className="w-full py-3 px-4 bg-primary text-on-primary-container font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dim transition-all">
        + New Project
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
              
              ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-[#e9e1ff] backdrop-blur-lg border border-blue-400/20 shadow-md'
                  : 'text-[#4a426b] hover:text-[#a3a6ff] hover:bg-[#211749]/80 backdrop-blur-md border border-transparent hover:border-blue-400/10'
              }
            `}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom thumbnails */}
      <div className="grid grid-cols-2 gap-2">
        <div className="aspect-square bg-[#2e225d] rounded-lg hover:scale-105 transition-transform" />
        <div className="aspect-square bg-[#2e225d] rounded-lg hover:scale-105 transition-transform" />
      </div>

    </aside>
  );
}