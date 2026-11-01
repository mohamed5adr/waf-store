"use client";

import Link from "next/link";

// صفحة 404 — الرابط اللي الزائر بيدور عليه مش موجود
export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="text-7xl mb-4">🔍</div>
      <h1 className="font-extrabold text-3xl mb-2">الصفحة مش موجودة</h1>
      <p className="text-gray-500 leading-7 mb-1">
        اللينك اللي فتحته غلط أو الصفحة اتنقلت أو اتمسحت.
      </p>
      <p className="text-xs text-gray-400 mb-8">كود الخطأ: 404 — Not Found</p>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 text-right mb-8">
        <p className="font-bold text-sm mb-2">💬 أسباب محتملة:</p>
        <ul className="text-sm text-gray-500 space-y-1.5 list-disc pr-5">
          <li>كتبت الرابط بحروف ناقصة أو زيادة</li>
          <li>المنتج أو القسم اللي كانت تدور عليه اتمسح</li>
          <li>لينك قديم اتبعتلك من قبل واتغير</li>
        </ul>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark"
        >
          🔄 حاول مرة أخرى
        </button>
        <Link href="/" className="bg-white border border-gray-200 font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary">
          🏠 الرئيسية
        </Link>
        <Link href="/collections" className="bg-white border border-gray-200 font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary">
          🗂️ تصفح الأقسام
        </Link>
      </div>
    </div>
  );
}
