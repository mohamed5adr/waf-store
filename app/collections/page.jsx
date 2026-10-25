"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import { useProducts } from "@/lib/hooks";
import { categories, egp } from "@/lib/data";

export default function CollectionsIndexPage() {
  const { products, error } = useProducts();

  if (!products) return <p className="text-center text-gray-400 py-24">⏳ بنجيب المنتجات...</p>;
  if (error) return <p className="text-center text-accent-red py-16">مشكلة تحميل: {error}</p>;
  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-2xl">تصفح الأقسام</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          const list = products.filter((p) => p.category === c.id);
          return (
            <Link key={c.id} href={`/collections/${c.id}`} className="bg-white rounded-xl border border-black/5 shadow-sm p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors">
              <span className="text-5xl">{c.emoji}</span>
              <span className="font-bold">{c.name}</span>
              <span className="text-xs text-gray-400">{list.length} منتج</span>
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
