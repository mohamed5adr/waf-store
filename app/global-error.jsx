"use client";

// خطأ عالمي — لو المشكلة في هيكل الموقع نفسه (هيصفّي كل حاجة)
export default function GlobalError({ error, reset }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ fontFamily: "sans-serif", background: "#f9fafb", margin: 0 }}>
        <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center", padding: "0 16px" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>الموقع فيه خلل مؤقت</h1>
          <p style={{ color: "#6b7280", lineHeight: 1.8, margin: "0 0 28px" }}>
            حصلت مشكلة تقنية حصلت في الموقع نفسه — فريقنا عاملة عليها. جرب تحديث الصفحة أو ارجع بعد شوية.
          </p>
          <button
            onClick={reset}
            style={{ background: "#136163", color: "#fff", fontWeight: 700, padding: "12px 28px", borderRadius: 12, border: "none", fontSize: 15, cursor: "pointer" }}
          >
            🔄 حاول مرة أخرى
          </button>
        </div>
      </body>
    </html>
  );
}
