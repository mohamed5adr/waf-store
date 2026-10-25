"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/hooks";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function Results() {
  const { products, error } = useProducts();
  const q = (useSearchParams().get("q") || "").trim();
  const list = products && q
    ? products.filter((p) => p.name.includes(q) || p.name.toLowerCase().includes(q.toLowerCase()))
    : [];

  if (!products) return <p className="text-center text-gray-400 py-24">⏳ بنجيب المنتجات...</p>;
  if (error) return <p className="text-center text-accent-red py-16">مشكلة تحميل: {error}</p>;

  return (
    <div>
      <h1 className="font-extrabold text-2xl mb-2">
        نتائج البحث {q && <span className="text-gray-500 text-base">عن «{q}»</span>}
      </h1>

      {list.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="mb-3">مفيش نتائج تطابق بحثك 🤔</p>
          <Link href="/collections" className="text-primary font-bold hover:underline">تصفح كل المنتجات</Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
}
