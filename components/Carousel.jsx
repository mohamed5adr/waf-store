"use client";

import { useRef } from "react";

export default function Carousel({ title, children, viewAllHref }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth - 100), behavior: "smooth" });
  };

  return (
    <section className="mt-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-lg md:text-xl">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllHref && (
            <a href={viewAllHref} className="text-sm text-primary hover:underline">عرض الكل</a>
          )}
          <button onClick={() => scroll(1)} aria-label="السابق" className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
            <span className="rotate-90 inline-block text-gray-500">‹</span>
          </button>
          <button onClick={() => scroll(-1)} aria-label="التالي" className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
            <span className="rotate-90 inline-block text-gray-500">›</span>
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4">
        {children}
      </div>
    </section>
  );
}
