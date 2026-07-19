'use client';

import Dock from './dock';

export default function NavbarDock() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center">
      <Dock />
    </div>
  );
}