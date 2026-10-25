"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/data";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [q, setQ] = useState("");

  const go = () => {
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div className="sm:hidden">
      <button aria-label="بحث" onClick={() => setOpen(true)} className="w-10 h-10 flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-2.6-2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && go()}
                placeholder="أبحث عن..."
                className="flex-1 h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary"
              />
              <button onClick={go} className="bg-primary text-white px-4 rounded-xl font-bold">بحث</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-gray-400 w-full">تسوّق حسب القسم:</span>
              {categories.map((c) => (
                <Link key={c.id} href={`/collections/${c.id}`} onClick={() => setOpen(false)} className="text-xs bg-gray-100 rounded-full px-3 py-1.5 text-gray-700">
                  {c.emoji} {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
