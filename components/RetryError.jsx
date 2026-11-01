"use client";

import Link from "next/link";

// كومبوننت موحّد: رسالة فشل تحميل + زرار "حاول مرة أخرى" + أسباب مقترحة
export default function RetryError({ onRetry }) {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="text-6xl mb-3">📡</div>
      <h1 className="font-extrabold text-2xl mb-2">مشكلة في تحميل البيانات</h1>
      <p className="text-gray-500 text-sm leading-7 mb-1">
        غالبًا النت فصل عندك أو السيرفر مشغول دلوقتي — مش مشكلة كبيرة.
      </p>
      <p className="text-xs text-gray-400 mb-8">نوع الخطأ: مشكلة شبكة أثناء التحميل</p>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 text-right mb-8">
        <p className="font-bold text-sm mb-2">💬 جرب الحاجات دي:</p>
        <ul className="text-sm text-gray-500 space-y-1.5 list-disc pr-5">
          <li>اتأكد إن الواي فاي أو البيانات شغالة</li>
          <li>اكبس "حاول مرة أخرى" — بتحاول تاني من غير ما تسيب الصفحة</li>
          <li>لو شايلة، اعمل تحديث كامل للصفحة (F5)</li>
        </ul>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={onRetry} className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
          🔄 حاول مرة أخرى
        </button>
        <Link href="/" className="bg-white border border-gray-200 font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary">
          🏠 الرئيسية
        </Link>
      </div>
    </div>
  );
}
