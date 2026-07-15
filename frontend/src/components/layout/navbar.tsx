'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How It Works' },
    
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
  {/* Left */}
  <div className="flex flex-1 items-center">
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/logo.png"
        alt="Prioro"
        width={36}
        height={36}
      />

      <span className="text-xl font-bold">
        Prioro
      </span>
    </Link>
  </div>

  {/* Center */}
  <nav className="flex items-center gap-8">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={`text-sm font-medium transition-colors ${
          pathname === link.href
            ? 'text-indigo-600'
            : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
        }`}
      >
        {link.label}
      </Link>
    ))}
  </nav>

  {/* Right */}
  <div className="flex flex-1 justify-end">
    <ThemeToggle />
  </div>
</div>
    </header>
  );
}