"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { governorates, egp } from "@/lib/data";

const emptyForm = { name: "", phone: "", gov: "القاهرة", city: "", address: "", notes: "" };

export default function CheckoutPage() {
  const { items, total, discount, finalTotal, coupon, clear } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!/^01\d{9}$/.test(form.phone.trim())) errs.phone = "رقم موبايل مصري غير صحيح (مثال: 01012345678)";
    if (!form.city.trim()) errs.city = "المدينة/المنطقة مطلوبة";
    if (!form.address.trim()) errs.address = "العنوان مطلوب";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const orderId = Math.floor(100000 + Math.random() * 900000);
    setDone(orderId);
    clear();
  };

  if (done) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-extrabold text-2xl mb-2">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-gray-500 text-sm mb-1">رقم طلبك: <span className="font-bold text-primary">#{done}</span></p>
        <p className="text-gray-400 text-sm mb-8">هنتواصل معاك على رقمك لتأكيد الطلب والمعاينة قبل الشحن.</p>
        <Link href="/" className="inline-block bg-primary text-white font-bold rounded-xl px-8 py-3 hover:bg-primary-dark">
          رجوع للرئيسية
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">السلة فاضية — أضف منتجات الأول</p>
        <Link href="/collections" className="text-primary font-bold hover:underline">تصفح المنتجات</Link>
      </div>
    );
  }

  const inputCls = (k) =>
    `w-full h-11 rounded-xl border px-4 focus:outline-none focus:border-primary ${errors[k] ? "border-accent-red" : "border-gray-200"}`;

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
      <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-2xl border border-black/5 shadow-sm p-5 md:p-7 space-y-4">
        <h1 className="font-extrabold text-xl mb-2">بيانات التوصيل</h1>

        <div>
          <label className="text-sm font-bold block mb-1.5">الاسم بالكامل *</label>
          <input value={form.name} onChange={set("name")} className={inputCls("name")} placeholder="اكتب اسمك بالكامل" />
          {errors.name && <p className="text-xs text-accent-red mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-sm font-bold block mb-1.5">رقم الموبايل *</label>
          <input value={form.phone} onChange={set("phone")} inputMode="numeric" dir="ltr" className={`${inputCls("phone")} text-right`} placeholder="01012345678" />
          {errors.phone && <p className="text-xs text-accent-red mt-1">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-bold block mb-1.5">المحافظة *</label>
            <select value={form.gov} onChange={set("gov")} className={inputCls("gov")}>
              {governorates.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-bold block mb-1.5">المدينة / المنطقة *</label>
            <input value={form.city} onChange={set("city")} className={inputCls("city")} placeholder="مثال: مدينة نصر" />
            {errors.city && <p className="text-xs text-accent-red mt-1">{errors.city}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold block mb-1.5">العنوان بالتفصيل *</label>
          <textarea value={form.address} onChange={set("address")} rows={2} className={`${inputCls("address")} h-auto py-3`} placeholder="شارع، عمارة، رقم الدور، علامة مميزة..." />
          {errors.address && <p className="text-xs text-accent-red mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="text-sm font-bold block mb-1.5">ملاحظات (اختياري)</label>
          <textarea value={form.notes} onChange={set("notes")} rows={2} className={`${inputCls("notes")} h-auto py-3`} placeholder="أي تفاصيل إضافية عن الطلب أو المقاسات" />
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
          💰 الدفع عند الاستلام (كاش) بعد المعاينة
        </div>

        <button type="submit" className="w-full bg-primary text-white font-extrabold py-3.5 rounded-xl hover:bg-primary-dark">
          تأكيد الطلب
        </button>
      </form>

      <aside className="lg:col-span-2 h-fit bg-white rounded-2xl border border-black/5 shadow-sm p-5 sticky top-4">
        <h2 className="font-extrabold mb-4">ملخص الطلب</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((i) => (
            <div key={i.key} className="flex justify-between text-sm gap-2">
              <span className="text-gray-600 line-clamp-1">{i.name} × {i.qty}</span>
              <span className="font-bold shrink-0">{egp(i.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>الشحن</span>
            <span className="text-emerald-600 font-bold">مجاني</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>خصم ({coupon?.code})</span>
              <span className="text-accent-red font-bold">− {egp(discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-extrabold text-lg">
            <span>الإجمالي</span>
            <span className="text-primary">{egp(finalTotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
