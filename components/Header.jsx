"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { store } from "@/lib/data";
import SearchOverlay from "./SearchOverlay";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-2.6-2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 md:h-6 w-5 md:w-6 text-primary" aria-hidden="true">
      <path d="M16.36 6.87c0-2.39-1.93-4.32-4.32-4.32A4.32 4.32 0 0 0 7.7 6.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.03 21.49c-6.51 0-7.26-2.05-8.72-7.47-1.46-5.43 1.48-7.46 8.72-7.46s10.18 2.03 8.72 7.46c-1.47 5.42-2.22 7.47-8.72 7.47Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-primary w-full top-0 z-20 header-shadow sticky">
      <nav aria-label="Top" className="w-full py-4 md:pb-6 md:pt-5">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="h-14 flex items-center gap-2">
            <div className="flex-none">
              <Link href="/" className="block w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white flex items-center justify-center text-2xl md:text-3xl" aria-label={store.name}>
                🛍️
              </Link>
            </div>
            <div className="ms-auto flex flex-1 mx-2 items-center flex-col">
              <div className="hidden sm:block w-full md:w-4/5 relative">
                <input
                  type="text"
                  id="global-search"
                  placeholder="أبحث عن..."
                  className="bg-white border-0 w-full h-11 md:h-[54px] rounded-xl md:rounded-2xl px-4 focus:outline-none focus:ring-0 text-sm md:text-base"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`;
                    }
                  }}
                />
                <button
                  className="bg-primary rounded-lg p-2 absolute top-1/2 -translate-y-1/2 left-1 md:left-2.5"
                  aria-label="ابحث"
                  onClick={() => {
                    const v = document.getElementById("global-search")?.value?.trim();
                    if (v) window.location.href = `/search?q=${encodeURIComponent(v)}`;
                  }}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="sm:hidden flow-root flex items-center">
              <SearchOverlay />
            </div>
            <div className="ms-2 flow-root lg:ms-4">
              <Link href="/cart" className="relative p-2.5 md:p-3 flex bg-white rounded-full items-center hover:opacity-90">
                <BagIcon />
                <div className={`absolute flex items-center justify-center -top-1 -right-1 text-xs font-medium h-[19px] min-w-[19px] px-1 rounded-full ${count > 0 ? "bg-accent-red" : "bg-gray-400"}`}>
                  <span className="text-white">{count}</span>
                </div>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
