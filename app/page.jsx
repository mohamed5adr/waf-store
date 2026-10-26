"use client";

import Link from "next/link";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { useProducts, useCategories } from "@/lib/hooks";
import { reviews, features, discountOf, egp } from "@/lib/data";

function CategoryCircles() {
  const { categories } = useCategories();
  return (
    <Carousel title="الأقسام" viewAllHref="/collections">
      {(categories || []).map((c) => (
        <Link
          key={c.id}
          href={`/collections/${c.id}`}
          className="snap-start shrink-0 w-28 flex flex-col items-center gap-2"
        >
          {c.image ? (
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border border-black/5 shadow-sm hover:border-primary hover:shadow-md transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center text-4xl hover:border-primary hover:shadow-md transition-all">
              {c.emoji}
            </div>
          )}
          <span className="text-sm font-semibold text-gray-700">{c.name}</span>
        </Link>
      ))}
    </Carousel>
  );
}

export default function HomePage() {
  const { add } = useCart();
  const { products, error } = useProducts();

  if (!products) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p className="text-4xl mb-3">🛍️</p>
        <p>بنجهز المتجر...</p>
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-accent-red py-16">حصلت مشكلة في تحميل المنتجات: {error}</p>;
  }

  const bestSellers = products.slice(0, 8);
  const newArrivals = products.slice(8, 16);
  const suggested = products.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* بانر ترحيبي */}
      <div className="rounded-2xl bg-primary text-white px-6 py-8 md:px-10 md:py-12 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-2">خصومات تصل حتى 50%</h1>
        <p className="text-white/90 text-sm md:text-base mb-5">شحن مجاني لكل المحافظات • معاينة قبل الاستلام</p>
        <Link href="/collections" className="inline-block bg-white text-primary font-bold rounded-xl px-6 py-2.5 hover:bg-gray-100">
          تسوّق دلوقتي
        </Link>
      </div>

      <CategoryCircles />

      {/* الأكثر مبيعاً */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg md:text-xl">الأكثر مبيعاً</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* أحدث المنتجات — كاروسيل */}
      <Carousel title="أحدث المنتجات" viewAllHref="/collections">
        {newArrivals.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-44 md:w-56">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>

      {/* مقترحة لك */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg md:text-xl">مقترحة لك</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">
          {suggested.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* آراء العملاء */}
      <section>
        <h2 className="font-bold text-lg md:text-xl text-center mt-8 mb-1">آراء العملاء</h2>
        <p className="text-center text-sm text-gray-500 mb-5">ما يقوله عملاؤنا عن تجربتهم مع المتجر</p>
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-xl border border-black/5 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.title}</p>
                </div>
                <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-sm text-gray-600 leading-7">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* مميزات المتجر */}
      <section>
        <h2 className="font-bold text-lg md:text-xl text-center mt-8 mb-5">مميزات المتجر</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-black/5 shadow-sm p-5 text-center">
              <div className="text-4xl mb-3">{f.emoji}</div>
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-6">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
