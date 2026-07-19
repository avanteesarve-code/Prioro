'use client';

import { usePathname } from 'next/navigation';
import { useMotionValue } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  Ticket,
  BarChart3,
  Users,
  Info,
  Workflow,
} from 'lucide-react';

import DockIcon from './dock-icon';

const dockItems = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Tickets',
    href: '/tickets',
    icon: Ticket,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Workload',
    href: '/workload',
    icon: Users,
  },
  {
    title: 'About',
    href: '/about',
    icon: Info,
  },
  {
    title: 'How It Works',
    href: '/how-it-works',
    icon: Workflow,
  },
];

export default function Dock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex items-center justify-center">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="
flex
h-16
items-center
gap-2
rounded-full
border
border-border/30
bg-background/70
px-3
shadow-sm
backdrop-blur-xl
overflow-visible
"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            active={pathname === item.href}
            mouseX={mouseX}
          />
        ))}
      </div>
    </div>
  );
}