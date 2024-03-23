// MenuItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  text: string;
  icon?: React.ReactNode;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer w-full transition duration-200 ease-in-out my-2 ${
          isActive ? "bg-blue-300" : "hover:bg-slate-100"
        }`}
      >
        {icon && <div className="w-5 h-5">{icon}</div>}
        <div className="text-zinc-600 text-base font-medium font-['DM Sans']">
          {text}
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;