"use client";

// صفحة الخطأ العامة — أي مشكلة غير متوقعة في تشغيل الصفحة
export default function Error({ error, reset }) {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="text-7xl mb-4">🛠️</div>
      <h1 className="font-extrabold text-3xl mb-2">حصل خطأ غير متوقع</h1>
      <p className="text-gray-500 leading-7">
        الصفحة ديت واجهت مشكلة أثناء التحميل — غالبًا مشكلة مؤقتة ومش من عندك.
      </p>
      <p className="text-xs text-gray-400 mt-2 mb-8">كود الخطأ: 500 — Internal Error</p>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 text-right mb-8">
        <p className="font-bold text-sm mb-2">💬 جرب الحاجات دي بالترتيب:</p>
        <ul className="text-sm text-gray-500 space-y-1.5 list-disc pr-5">
          <li>اعمل تحديث للصفحة (زرار "حاول تاني" تحت)</li>
          <li>اتأكد إن النت شغال عندك</li>
          <li>لو المشكلة شايلة: امسح الكاش (Cache) من المتصفح</li>
          <li>استنى دقيقة وارجع — لو المشكلة استمرت ابعتلنا على واتساب</li>
        </ul>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={reset} className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
          🔄 حاول تاني
        </button>
        <a href="/" className="bg-white border border-gray-200 font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary">
          🏠 الرئيسية
        </a>
      </div>
    </div>
  );
}
