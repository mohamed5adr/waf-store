"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/lib/hooks";
import { discountOf } from "@/lib/data";

const sorts = [
  { id: "default", label: "الافتراضي" },
  { id: "discount", label: "الأعلى خصمًا" },
  { id: "price-asc", label: "السعر: الأقل الأول" },
  { id: "price-desc", label: "السعر: الأعلى الأول" },
];

export default function CollectionPage({ params }) {
  const { categories } = useCategories();
  const { products, error } = useProducts();
  const [active, setActive] = useState("default");
  const cat = (categories || []).find((c) => c.id === params.slug);
  const base = products && cat ? products.filter((p) => p.category === cat.id) : [];

  if (!products || !categories) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="text-4xl mb-3">🛍️</p>
        <p>بنجهز المتجر...</p>
      </div>
    );
  }
  if (error) return <p className="text-center text-accent-red py-16">مشكلة تحميل: {error}</p>;

  const sortBtn = "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors";
  const list = (() => {
    const l = [...base];
    if (active === "discount") l.sort((a, b) => discountOf(b) - discountOf(a));
    if (active === "price-asc") l.sort((a, b) => a.price - b.price);
    if (active === "price-desc") l.sort((a, b) => b.price - a.price);
    return l;
  })();

  return (
    <div>
      {/* مسار التنقل */}
      <nav className="text-xs text-gray-400 mb-4 flex gap-1.5 items-center">
        <Link href="/" className="hover:text-primary">الرئيسية</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-primary">الأقسام</Link>
        <span>/</span>
        <span className="text-gray-600">{cat?.name || "غير موجود"}</span>
      </nav>

      {cat?.image ? (
        <div className="relative rounded-2xl overflow-hidden mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cat.image} alt={cat.name} className="w-full h-44 md:h-60 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex flex-col items-center justify-center text-white px-4 text-center">
            <span className="text-4xl mb-1 drop-shadow">{cat.emoji}</span>
            <h1 className="font-extrabold text-2xl md:text-3xl drop-shadow">{cat.name}</h1>
            <p className="text-xs md:text-sm opacity-90 mt-1">{base.length} منتج</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-primary-light/20 px-6 py-8 text-center mb-6">
          <div className="text-5xl mb-2">{cat?.emoji}</div>
          <h1 className="font-extrabold text-2xl">{cat?.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{base.length} منتج</p>
        </div>
      )}

      {/* الترتيب */}
      <div className="flex gap-2 flex-wrap mb-4">
        {sorts.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`${sortBtn} ${
              active === s.id ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-12">مفيش منتجات في القسم ده</p>
      )}
    </div>
  );
}
