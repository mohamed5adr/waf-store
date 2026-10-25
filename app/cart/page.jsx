"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { egp } from "@/lib/data";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { items, setQty, remove, clear, total, discount, finalTotal, coupon, applyCoupon, resetCoupon } = useCart();
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);

  if (!items.length) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="font-extrabold text-xl mb-2">سلة التسوق فاضية</h1>
        <p className="text-gray-400 text-sm mb-6">ابدأ التسوق واكتشف أحدث المنتجات بأفضل الأسعار</p>
        <Link href="/collections" className="inline-block bg-primary text-white font-bold rounded-xl px-8 py-3 hover:bg-primary-dark">
          تسوّق دلوقتي
        </Link>
      </div>
    );
  }

  const tryCoupon = () => {
    if (!code.trim()) return setCouponMsg({ ok: false, text: "اكتب كود الكوبون الأول" });
    const ok = applyCoupon(code);
    setCouponMsg(ok ? { ok: true, text: "✓ الكوبون اتفعّل" } : { ok: false, text: "الكوبون غير صحيح أو منتهي" });
    if (ok) setCode("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-extrabold text-2xl">سلة التسوق ({items.length} منتج)</h1>
        <button onClick={clear} className="text-xs text-accent-red hover:underline">إفراغ السلة</button>
      </div>

      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.key} className="bg-white rounded-xl border border-black/5 shadow-sm p-4 flex gap-4 items-center">
            <div className="w-20 shrink-0">
              <ProductImage product={i} size="small" />
            </div>
            <div className="grow min-w-0">
              <p className="font-semibold text-sm md:text-base line-clamp-1">{i.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">المقاس: {i.size}</p>
              <p className="text-primary font-bold mt-1">{egp(i.price)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQty(i.key, i.qty + 1)} className="w-8 h-8 text-lg text-primary hover:bg-gray-50">+</button>
                <span className="w-8 text-center text-sm font-bold">{i.qty}</span>
                <button onClick={() => setQty(i.key, i.qty - 1)} className="w-8 h-8 text-lg text-gray-500 hover:bg-gray-50">−</button>
              </div>
              <button onClick={() => remove(i.key)} className="text-xs text-accent-red hover:underline">حذف</button>
            </div>
          </div>
        ))}
      </div>

      {/* الكوبون */}
      <div className="mt-4 bg-white rounded-xl border border-black/5 shadow-sm p-4">
        <p className="font-bold text-sm mb-2">🏷️ كود الخصم</p>
        {coupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            <span className="text-sm font-bold text-emerald-700">كوبون {coupon.code} يتم تطبيقه</span>
            <button onClick={() => { resetCoupon(); setCouponMsg(null); }} className="text-xs text-accent-red hover:underline">إزالة</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryCoupon()}
              placeholder="مثال: WELCOME10"
              className="flex-1 h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-primary"
            />
            <button onClick={tryCoupon} className="bg-primary text-white text-sm font-bold px-5 rounded-lg hover:bg-primary-dark">تطبيق</button>
          </div>
        )}
        {couponMsg && <p className={`text-xs mt-2 ${couponMsg.ok ? "text-emerald-600" : "text-accent-red"}`}>{couponMsg.text}</p>}
      </div>

      <div className="mt-4 bg-white rounded-xl border border-black/5 shadow-sm p-5">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>الشحن</span>
          <span className="text-emerald-600 font-bold">مجاني 🎉</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>خصم ({coupon?.code})</span>
            <span className="text-accent-red font-bold">− {egp(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-100">
          <span>الإجمالي</span>
          <span className="text-primary">{egp(finalTotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-5 block text-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark"
        >
          إتمام الطلب
        </Link>
      </div>
    </div>
  );
}
