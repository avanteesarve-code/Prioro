'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  Ticket,
  BarChart3,
  Info,
  Workflow,
  Users,
} from 'lucide-react';

const dockItems = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
  },
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/tickets',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    title: 'Workload',
    icon: Users,
    href: '/workload',
  },
  {
    title: 'About',
    icon: Info,
    href: '/about',
  },
  {
    title: 'How It Works',
    icon: Workflow,
    href: '/how-it-works',
  },
];

export function FloatingDock() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          flex
          items-center
          gap-3
          rounded-full
          border
          border-border/60
          bg-background/80
          p-3
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.title} href={item.href}>
              <motion.div
                whileHover={{
                  scale: 1.15,
                  y: -6,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                className="group relative"
              >
                {/* Tooltip */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -top-11
                    left-1/2
                    -translate-x-1/2
                    rounded-lg
                    bg-foreground
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-background
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-200
                    group-hover:opacity-100
                  "
                >
                  {item.title}
                </div>

                {/* Icon Button */}
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? 'bg-[#2a9d8f] text-white shadow-lg shadow-[#2a9d8f]/40'
                        : 'bg-muted hover:bg-[#2a9d8f]/10 hover:text-[#2a9d8f]'
                    }
                  `}
                >
                  <Icon size={22} />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}