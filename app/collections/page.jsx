"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import { useProducts, useCategories } from "@/lib/hooks";
import { egp } from "@/lib/data";

export default function CollectionsIndexPage() {
  const { products, error } = useProducts();
  const { categories } = useCategories();

  if (!products || !categories) return <p className="text-center text-gray-400 py-24">⏳ بنجيب المتجر...</p>;
  if (error) return <p className="text-center text-accent-red py-16">مشكلة تحميل: {error}</p>;
  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-2xl">تصفح الأقسام</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          const list = products.filter((p) => p.category === c.id);
          return (
            <Link key={c.id} href={`/collections/${c.id}`} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden hover:border-primary transition-colors flex flex-col">
              {c.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={c.image} alt={c.name} className="w-full aspect-[4/3] object-cover" />
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-300 flex items-center justify-center text-6xl">{c.emoji}</div>
              )}
              <div className="p-4 flex flex-col items-center gap-1">
                <span className="font-bold">{c.name}</span>
                <span className="text-xs text-gray-400">{list.length} منتج</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Carousel title="كل المنتجات" viewAllHref="/collections">
        {products.slice(0, 10).map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-44 md:w-56">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
