'use client';

import Link from 'next/link';
import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef } from 'react';

interface DockIconProps {
  title: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  mouseX: MotionValue<number>;
}

export default function DockIcon({
  title,
  href,
  icon: Icon,
  active,
  mouseX,
}: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) return 200;

    return value - (bounds.left + bounds.width / 2);
  });

  // Slight magnification
  const size = useTransform(
    distance,
    [-120, 0, 120],
    [48, 60, 48]
  );

  // Small lift
  const y = useTransform(
    distance,
    [-120, 0, 120],
    [0, -4, 0]
  );

  const animatedSize = useSpring(size, {
    stiffness: 300,
    damping: 22,
  });

  const animatedY = useSpring(y, {
    stiffness: 300,
    damping: 22,
  });

  return (
    <Link
      href={href}
      ref={ref}
      className="group relative flex items-center justify-center"
    >
      <motion.div
        style={{
          width: animatedSize,
          height: animatedSize,
          y: animatedY,
        }}
        className={`flex items-center justify-center rounded-full transition-colors duration-300 ${
          active
            ? 'bg-[#2a9d8f] text-white'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        <Icon size={22} />
      </motion.div>

      <div
  className="
    pointer-events-none
    absolute
    top-full
    mt-3
    left-1/2
    -translate-x-1/2
    whitespace-nowrap
    rounded-md
    bg-zinc-900
    px-2.5
    py-1
    text-xs
    font-medium
    text-white
    opacity-0
    transition-all
    duration-200
    group-hover:translate-y-1
    group-hover:opacity-100
  "
>
  {title}
</div>
    </Link>
  );
}