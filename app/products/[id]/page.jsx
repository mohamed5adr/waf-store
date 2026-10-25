"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/lib/cart";
import { useProducts } from "@/lib/hooks";
import { sizes, discountOf, egp } from "@/lib/data";

export default function ProductPage({ params }) {
  const { products, error } = useProducts();
  const product = products ? products.find((p) => String(p.id) === params.id) : null;
  const router = useRouter();
  const { add } = useCart();
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!products) return <p className="text-center text-gray-400 py-24">⏳ بنجيب المنتجات...</p>;
  if (error) return <p className="text-center text-accent-red py-16">مشكلة تحميل: {error}</p>;

  if (!product) {
    return <p className="text-center text-gray-400 py-16">المنتج مش موجود 😕</p>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);

  const handleAdd = (then) => {
    add(product, size);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      if (then) router.push("/cart");
    }, 1200);
  };

  return (
    <div>
      <nav className="text-xs text-gray-400 mb-4 flex gap-1.5 items-center">
        <Link href="/" className="hover:text-primary">الرئيسية</Link>
        <span>/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-primary">{product.emoji} القسم</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6">
        <ProductImage product={product} className="!rounded-2xl" />

        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 md:p-8 h-fit">
          <h1 className="font-extrabold text-xl md:text-2xl leading-9">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-primary font-extrabold text-2xl">{egp(product.price)}</span>
            <span className="text-gray-400 line-through">{egp(product.oldPrice)}</span>
            <span className="bg-accent-red/10 text-accent-red text-xs font-bold px-2.5 py-1 rounded-full">
              وفّر {discountOf(product)}%
            </span>
          </div>

          <div className="mt-6">
            <p className="font-bold text-sm mb-2">المقاس</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 px-3 py-2 rounded-lg text-sm font-bold border transition-colors ${
                    size === s ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-700 hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => handleAdd(false)}
              disabled={added}
              className={`flex-1 font-bold py-3 rounded-xl transition-colors ${added ? "bg-emerald-600 text-white" : "bg-primary text-white hover:bg-primary-dark"}`}
            >
              {added ? "✓ تمت الإضافة للسلة" : "أضف للسلة"}
            </button>
            <button
              onClick={() => handleAdd(true)}
              className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              اشتري الآن
            </button>
          </div>

          <ul className="mt-6 text-sm text-gray-600 space-y-2 border-t border-gray-100 pt-5">
            <li>🚚 شحن مجاني لجميع المحافظات</li>
            <li>🔍 معاينة مجانية قبل الاستلام</li>
            <li>↩️ إمكانية الاستبدال في حالة وجود مشكلة</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-bold text-lg md:text-xl mb-4">منتجات مشابهة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-xl border border-black/5 shadow-sm p-3 hover:border-primary transition-colors">
                <ProductImage product={p} />
                <p className="text-xs font-semibold mt-2 line-clamp-2">{p.name}</p>
                <p className="text-primary font-bold text-sm mt-1">{egp(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
