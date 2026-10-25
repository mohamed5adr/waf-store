"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "الرئيسية", icon: "🏠" },
  { href: "/collections", label: "الأقسام", icon: "🗂️" },
  { href: "/cart", label: "سلة التسوق", icon: "🛍️", badge: true },
  { href: "/pages", label: "المزيد", icon: "⋯" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-black/10 z-30 lg:hidden">
      <div className="flex justify-around items-stretch h-14">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] ${active ? "text-primary font-bold" : "text-gray-500"}`}>
              <span className="relative text-lg leading-none">
                {l.icon}
                {l.badge && count > 0 && (
                  <span className="absolute -top-1.5 -left-2 bg-accent-red text-white text-[9px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{count}</span>
                )}
              </span>
              <span>{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
