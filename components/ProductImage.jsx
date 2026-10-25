"use client";

import { egp } from "@/lib/data";

// صورة منتج: لو فيه صورة مرفوعة تتعرض، وإلا placeholder بالإيموجي
const gradients = [
  "from-teal-100 to-teal-300",
  "from-slate-100 to-slate-300",
  "from-stone-100 to-stone-300",
  "from-emerald-100 to-emerald-300",
  "from-cyan-100 to-cyan-300",
  "from-zinc-100 to-zinc-300",
  "from-neutral-100 to-neutral-300",
  "from-blue-100 to-blue-300",
];

export default function ProductImage({ product, size = "default", className = "" }) {
  const h = size === "default" ? "aspect-[4/5]" : size === "tall" ? "aspect-[3/4]" : "aspect-square";
  const g = gradients[(product.g ?? 0) % gradients.length];

  return (
    <div className={`relative w-full ${h} rounded-xl overflow-hidden flex items-center justify-center ${className}`}>
      {product.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${g} flex items-center justify-center`}>
          <span className={size === "default" ? "text-7xl" : "text-5xl"} role="img" aria-label={product.name}>
            {product.emoji}
          </span>
        </div>
      )}
    </div>
  );
}
