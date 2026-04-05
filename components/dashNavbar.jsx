'use client';

import { Menu, X, Coins, LogIn } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  // Replace with real credits from DB later
  const credits = 24;

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0f072e]/80 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          AdStudio
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">

          {isLoaded && isSignedIn ? (
            <>
              {/* Credits */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-white">{credits}</span>
              </div>

              {/* User */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  {user.firstName}
                </span>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8 rounded-full border border-white/20' } }} />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition shadow-lg shadow-blue-500/20">
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </SignInButton>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/70 backdrop-blur-xl transition ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isLoaded && isSignedIn ? (
            <>
              {/* Credits */}
              <div className="flex items-center gap-2 text-white text-lg">
                <Coins className="w-5 h-5 text-yellow-400" />
                {credits} Credits
              </div>

              {/* User */}
              <div className="flex flex-col items-center gap-4 mt-2">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-16 h-16' } }} />
                <span className="text-white text-lg font-semibold">{user.firstName}</span>
              </div>
            </>
        ) : (
            <div className="flex flex-col items-center gap-4">
               <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-lg font-bold transition">
                     <LogIn className="w-5 h-5" /> Sign In
                  </button>
               </SignInButton>
            </div>
        )}

        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 p-2 rounded-lg bg-white/10 text-white"
        >
          <X />
        </button>
      </div>
    </>
  );
}