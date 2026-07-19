'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import NavbarDock from '@/components/ui/navbar-dock';


export function Navbar() {


  return (
    <header className="sticky top-0 z-[100] overflow-visible border-b border-gray-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-24 max-w-7xl items-center px-8">
  {/* Left */}
  <div className="flex flex-1 items-center">
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
  src="/logo.png"
  alt="Prioro"
  width={48}
  height={48}
/>

      <span className="text-xl font-bold tracking-tight">
        Prioro
      </span>
    </Link>
  </div>

  {/* Center */}
  <NavbarDock />

  {/* Right */}
  <div className="flex flex-1 justify-end">
    <ThemeToggle />
  </div>
</div>
    </header>
  );
}