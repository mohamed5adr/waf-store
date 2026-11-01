"use client";

// كومبوننت مراقبة الاتصال — أول ما النت يفصل تظهر شاشة واضحة، وأول ما يرجع تختفي
import { useEffect, useState } from "react";

export default function ConnectionWatcher() {
  const [offline, setOffline] = useState(false);
  const [backToast, setBackToast] = useState(false);

  useEffect(() => {
    // الحالة الأولى عند فتح الصفحة
    if (typeof navigator !== "undefined" && navigator.onLine === false) setOffline(true);

    const goOffline = () => setOffline(true);
    const goOnline = () => {
      setOffline(false);
      setBackToast(true);
      setTimeout(() => setBackToast(false), 3000);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return (
    <>
      {offline && (
        <div className="fixed inset-0 z-[200] bg-gray-50/95 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl border border-black/5 shadow-lg p-8 text-center max-w-sm w-full">
            <div className="text-6xl mb-4">📡</div>
            <h2 className="font-extrabold text-2xl mb-2">النت فصل!</h2>
            <p className="text-gray-500 text-sm leading-7 mb-5">
              اتأكد إن الواي فاي أو البيانات عندك شغالة — أول ما يرجع الاتصال هتكمل تتسوق عادي من نفس المكان.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse inline-block"></span>
              بنستنى رجوع الاتصال...
            </div>
          </div>
        </div>
      )}

      {backToast && !offline && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white text-sm font-bold px-5 py-3 rounded-full shadow-lg">
          ✓ رجع الاتصال — أهلًا بيك تاني
        </div>
      )}
    </>
  );
}
