'use client';

import { Menu, X, Coins } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
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

          {/* Credits */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-white">{credits}</span>
          </div>

          {/* User */}
          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">
                {user.firstName}
              </span>
              {/* <Image
                src={user.imageUrl}
                alt="user"
                width={32}
                height={32}
                className="rounded-full"
              /> */}
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
        {/* Credits */}
        <div className="flex items-center gap-2 text-white text-lg">
          <Coins className="w-5 h-5 text-yellow-400" />
          {credits} Credits
        </div>

        {/* User */}
        {isLoaded && isSignedIn && (
          <div className="flex flex-col items-center gap-2">
            {/* <Image
              src={user.imageUrl}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            /> */}
            <span className="text-white">{user.firstName}</span>
          </div>
        )}

        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 p-2 rounded-lg bg-white/10"
        >
          <X />
        </button>
      </div>
    </>
  );
}