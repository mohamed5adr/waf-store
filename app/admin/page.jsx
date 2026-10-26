"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories as seedCats, discountOf, egp } from "@/lib/data";
import { useCategories } from "@/lib/hooks";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginErr, setLoginErr] = useState("");
  const [logging, setLogging] = useState(false);

  const [editing, setEditing] = useState(null); // منتج جاري تعديله
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loadedList, setLoadedList] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);

  const [form, setForm] = useState({ name: "", price: "", oldPrice: "", category: "tangt", emoji: "🛍️", image: null });

  // الأقسام: قائمة ديناميكية من السيرفر + إدارة كاملة من اللوحة
  const { categories: fetchedCats, reload: reloadCats } = useCategories();
  const cats = fetchedCats || seedCats;
  const [catForm, setCatForm] = useState({ id: null, name: "", emoji: "🛍️", image: null });
  const [catPreview, setCatPreview] = useState(null);
  const [catMsg, setCatMsg] = useState(null);
  const [catBusy, setCatBusy] = useState(false);
  const [showCats, setShowCats] = useState(false);

  // تغيير بيانات الدخول: القديم + الجديد
  const [credsForm, setCredsForm] = useState({ oldUsername: "", oldPassword: "", newUsername: "", newPassword: "" });
  const [credsMsg, setCredsMsg] = useState(null);
  const [showCreds, setShowCreds] = useState(false);

  // أول ما تسجل الدخول → نجيب المنتجات
  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  const loadProducts = async () => {
    const r = await fetch("/api/products");
    const d = await r.json();
    setLoadedList(d.products);
    return d.products;
  };

  const login = async () => {
    setLogging(true);
    setLoginErr("");
    try {
      const r = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const d = await r.json();
      if (d.ok) setAuthed(true);
      else setLoginErr(d.error || "خطأ في تسجيل الدخول");
    } catch {
      setLoginErr("تعذر الاتصال بالسيرفر");
    } finally {
      setLogging(false);
    }
  };

  const changeCreds = async () => {
    setCredsMsg(null);
    try {
      const r = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credsForm),
      });
      const d = await r.json();
      if (d.ok) {
        setCredsMsg({ ok: true, text: "✓ تم تغيير بيانات الدخول — سيتم استخدامها في الدخول الجاي" });
        setCredsForm({ oldUsername: "", oldPassword: "", newUsername: "", newPassword: "" });
      } else {
        setCredsMsg({ ok: false, text: d.error || "فشل التغيير" });
      }
    } catch {
      setCredsMsg({ ok: false, text: "تعذر الاتصال بالسيرفر" });
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const uploadFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.url) {
        setForm((f) => ({ ...f, image: d.url }));
        setUploadPreview(d.url);
      } else {
        setMsg({ ok: false, text: d.error || "فشل رفع الصورة" });
      }
    } finally {
      setUploading(false);
    }
  };

  // وظائف إدارة الأقسام
  const uploadCategoryImage = async (file) => {
    if (!file) return;
    setCatBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.url) {
        setCatForm((f) => ({ ...f, image: d.url }));
        setCatPreview(d.url);
      } else {
        setCatMsg({ ok: false, text: d.error || "فشل رفع صورة الغلاف" });
      }
    } finally {
      setCatBusy(false);
    }
  };

  const resetCatForm = () => {
    setCatForm({ id: null, name: "", emoji: "🛍️", image: null });
    setCatPreview(null);
    setCatMsg(null);
  };

  const saveCategory = async () => {
    setCatMsg(null);
    setCatBusy(true);
    try {
      const url = catForm.id ? `/api/categories/${catForm.id}` : "/api/categories";
      const r = await fetch(url, {
        method: catForm.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: catForm.name, emoji: catForm.emoji, image: catForm.image }),
      });
      const d = await r.json();
      if (d.ok) {
        setCatMsg({ ok: true, text: catForm.id ? "✓ اتعدل القسم" : "✓ اتضاف القسم" });
        resetCatForm();
        await reloadCats();
      } else {
        setCatMsg({ ok: false, text: d.error || "فشل الحفظ" });
      }
    } catch {
      setCatMsg({ ok: false, text: "تعذر الاتصال بالسيرفر" });
    } finally {
      setCatBusy(false);
    }
  };

  const deleteCategory = async (c) => {
    if (!window.confirm(`متأكد عايز تمسح قسم "${c.name}"؟`)) return;
    const r = await fetch(`/api/categories/${c.id}`, { method: "DELETE" });
    const d = await r.json();
    if (d.ok) setCatMsg({ ok: true, text: "✓ اتمسح القسم" });
    else setCatMsg({ ok: false, text: d.error || "فشل المسح" });
    await reloadCats();
  };

  const resetForm = () => {
    setForm({ name: "", price: "", oldPrice: "", category: "tangt", emoji: "🛍️", image: null });
    setUploadPreview(null);
    setEditing(null);
  };

  const saveProduct = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const url = editing ? `/api/products/${editing.id}` : "/api/products";
      const r = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "خطأ غير متوقع");
      setMsg({ ok: true, text: editing ? "✓ اتعدل المنتج" : "✓ اتضاف المنتج" });
      resetForm();
      await loadProducts();
    } catch (e) {
      setMsg({ ok: false, text: String(e) });
    } finally {
      setBusy(false);
    }
  };

  const deleteOne = async (id) => {
    if (!window.confirm("متأكد عايز تمسح المنتج؟")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setMsg({ ok: true, text: "✓ اتمسح المنتج" });
    await loadProducts();
  };

  const deleteAll = async () => {
    if (!window.confirm("متأكد من مسح كل المنتجات؟ مفيش تراجع!")) return;
    await fetch("/api/products", { method: "DELETE" });
    setEditing(null);
    setMsg({ ok: true, text: "✓ تم مسح كل المنتجات" });
    await loadProducts();
  };

  // شاشة تسجيل الدخول (يوزرنيم + باسورد)
  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-16 bg-white rounded-2xl border border-black/5 shadow-sm p-7 text-center">
        <div className="text-5xl mb-3">🔐</div>
        <h1 className="font-extrabold text-xl mb-1">لوحة تحكم الأدمن</h1>
        <p className="text-xs text-gray-400 mb-5">دي منطقة مخصوص للإدارة فقط</p>
        <input
          type="text"
          value={loginForm.username}
          onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && login()}
          placeholder="اسم المستخدم"
          className="w-full h-11 rounded-xl border border-gray-200 px-4 mb-2 focus:outline-none focus:border-primary text-center"
          autoFocus
        />
        <input
          type="password"
          value={loginForm.password}
          onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && login()}
          placeholder="كلمة السر"
          className="w-full h-11 rounded-xl border border-gray-200 px-4 mb-2 focus:outline-none focus:border-primary text-center"
        />
        {loginErr && <p className="text-xs text-accent-red mb-2">{loginErr}</p>}
        <button onClick={login} disabled={logging} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-50">
          {logging ? "⏳ جاري التحقق..." : "دخول"}
        </button>
        <p className="text-[10px] text-gray-300 mt-4">الافتراضي: اسم المستخدم 0000 وكلمة السر 0000</p>
      </div>
    );
  }

  // لوحة التحكم
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="font-extrabold text-2xl">⚙️ لوحة التحكم</h1>
        <div className="flex gap-2 items-center">
          <Link href="/" className="text-sm text-primary hover:underline">صفحة المتجر ↗</Link>
          <button onClick={() => setAuthed(false)} className="text-xs text-gray-400 hover:text-accent-red">خروج</button>
        </div>
      </div>

      {msg && (
        <div className={`mb-4 rounded-xl px-4 py-3 text-sm ${msg.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-accent-red border border-red-100"}`}>
          {msg.text}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* تغيير بيانات الدخول */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
            <button onClick={() => setShowCreds(!showCreds)} className="w-full flex items-center justify-between text-right">
              <h2 className="font-bold">🔑 بيانات دخول الأدمن</h2>
              <span className="text-xs text-primary">{showCreds ? "إخفاء ▲" : "تغيير ▼"}</span>
            </button>

            {showCreds && (
              <div className="mt-4 space-y-3">
                <input value={credsForm.oldUsername} onChange={(e) => setCredsForm((f) => ({ ...f, oldUsername: e.target.value }))} placeholder="اسم المستخدم القديم" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
                <input type="password" value={credsForm.oldPassword} onChange={(e) => setCredsForm((f) => ({ ...f, oldPassword: e.target.value }))} placeholder="كلمة السر القديمة" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
                <div className="border-t border-dashed border-gray-200 pt-1"></div>
                <input value={credsForm.newUsername} onChange={(e) => setCredsForm((f) => ({ ...f, newUsername: e.target.value }))} placeholder="اسم المستخدم الجديد" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
                <input type="password" value={credsForm.newPassword} onChange={(e) => setCredsForm((f) => ({ ...f, newPassword: e.target.value }))} placeholder="كلمة السر الجديدة" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
                {credsMsg && <p className={`text-xs ${credsMsg.ok ? "text-emerald-600" : "text-accent-red"}`}>{credsMsg.text}</p>}
                <button onClick={changeCreds} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark">
                  حفظ البيانات الجديدة
                </button>
              </div>
            )}
          </div>

          {/* إدارة الأقسام: إضافة / تعديل / مسح + صورة غلاف */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
            <button onClick={() => setShowCats(!showCats)} className="w-full flex items-center justify-between text-right">
              <h2 className="font-bold">🗂️ إدارة الأقسام</h2>
              <span className="text-xs text-primary">{showCats ? "إخفاء ▲" : "إدارة ▼"}</span>
            </button>

            {showCats && (
              <div className="mt-4 space-y-4">
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                  {cats.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 bg-white">
                      {c.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={c.image} className="w-10 h-10 rounded-lg object-cover shrink-0" alt={c.name} />
                      ) : (
                        <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0">{c.emoji}</span>
                      )}
                      <div className="grow min-w-0">
                        <p className="text-sm font-bold">{c.name}</p>
                        <p className="text-[10px] text-gray-400">{(loadedList || []).filter((p) => p.category === c.id).length} منتج</p>
                      </div>
                      <button onClick={() => { setCatForm({ id: c.id, name: c.name, emoji: c.emoji || "🛍️", image: c.image || null }); setCatPreview(c.image || null); setCatMsg(null); }} className="text-xs bg-gray-100 hover:bg-gray-200 rounded-lg px-2.5 py-1.5 shrink-0">✏️</button>
                      <button onClick={() => deleteCategory(c)} className="text-xs bg-red-50 text-accent-red hover:bg-red-100 rounded-lg px-2.5 py-1.5 shrink-0">🗑️</button>
                    </div>
                  ))}
                </div>

                <div className="border border-dashed border-gray-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-bold">{catForm.id ? "✏️ تعديل القسم" : "➕ قسم جديد"}</p>
                  <input value={catForm.name} onChange={(e) => setCatForm((f) => ({ ...f, name: e.target.value }))} placeholder="اسم القسم (مثال: أحذية)" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
                  <input value={catForm.emoji} onChange={(e) => setCatForm((f) => ({ ...f, emoji: e.target.value }))} placeholder="إيموجي القسم (اختياري — بديل الصورة)" className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary text-center" />
                  <div>
                    <label className="text-xs font-bold block mb-1.5">صورة غلاف القسم 📷 (دي اللي هتبقى واجهة القسم)</label>
                    <input type="file" accept="image/*" onChange={(e) => uploadCategoryImage(e.target.files?.[0])} className="w-full text-xs file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-xs file:font-bold" />
                  </div>
                  {catBusy && <p className="text-xs text-gray-400">⏳ بيتم رفع الصورة...</p>}
                  {catPreview && (
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={catPreview} className="w-16 h-16 object-cover rounded-lg border" alt="غلاف" />
                      <button onClick={() => { setCatForm((f) => ({ ...f, image: null })); setCatPreview(null); }} className="text-xs text-accent-red hover:underline">إزالة الغلاف</button>
                    </div>
                  )}
                  {catMsg && <p className={`text-xs ${catMsg.ok ? "text-emerald-600" : "text-accent-red"}`}>{catMsg.text}</p>}
                  <div className="flex gap-2">
                    <button onClick={saveCategory} disabled={catBusy} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-50">
                      {catForm.id ? "حفظ التعديل" : "إضافة القسم"}
                    </button>
                    {catForm.id && (
                      <button onClick={resetCatForm} className="px-5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-primary hover:text-primary">إلغاء</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* نموذج الإضافة/التعديل */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
            <h2 className="font-bold mb-4">{editing ? `✏️ تعديل: ${editing.name}` : "➕ إضافة منتج جديد"}</h2>

            <label className="text-sm font-bold block mb-1.5">اسم المنتج *</label>
            <input value={form.name} onChange={set("name")} className="w-full h-11 rounded-xl border border-gray-200 px-4 mb-3 focus:outline-none focus:border-primary" />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-bold block mb-1.5">السعر بعد الخصم *</label>
                <input type="number" value={form.price} onChange={set("price")} className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1.5">السعر قبل الخصم</label>
                <input type="number" value={form.oldPrice} onChange={set("oldPrice")} className="w-full h-11 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-primary" />
              </div>
            </div>

            <label className="text-sm font-bold block mb-1.5">القسم</label>
            <select value={form.category} onChange={set("category")} className="w-full h-11 rounded-xl border border-gray-200 px-4 mb-3 focus:outline-none focus:border-primary">
              {cats.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>

            <label className="text-sm font-bold block mb-1.5">صورة المنتج 📷</label>
            <input type="file" accept="image/*" onChange={(e) => uploadFile(e.target.files?.[0])} className="w-full text-xs mb-2 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-xs file:font-bold" />
            {uploading && <p className="text-xs text-gray-400 mb-2">⏳ بيتم رفع الصورة...</p>}
            {uploadPreview && (
              <div className="mb-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={uploadPreview} className="w-16 h-16 object-cover rounded-lg border" alt="معاينة" />
                <button onClick={() => { setForm((f) => ({ ...f, image: null })); setUploadPreview(null); }} className="text-xs text-accent-red hover:underline">إزالة الصورة</button>
              </div>
            )}

            <label className="text-sm font-bold block mb-1.5">إيموجي بديل (لو مرفقتش صورة)</label>
            <input value={form.emoji} onChange={set("emoji")} className="w-full h-11 rounded-xl border border-gray-200 px-4 mb-4 focus:outline-none focus:border-primary text-center" />

            <div className="flex gap-2">
              <button onClick={saveProduct} disabled={busy || uploading} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-50">
                {editing ? "حفظ التعديلات" : "إضافة المنتج"}
              </button>
              {editing && (
                <button onClick={resetForm} className="px-5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-primary hover:text-primary">
                  إلغاء
                </button>
              )}
            </div>
          </div>
        </div>

        {/* جدول المنتجات */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-black/5 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">🛒 المنتجات الموحودة</h2>
            <button onClick={deleteAll} className="text-xs bg-red-50 text-accent-red border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-100 font-bold">
              🗑️ مسح كل المنتجات
            </button>
          </div>

          {!loadedList ? (
            <p className="text-center text-gray-400 py-10">⏳ بنجيب المنتجات...</p>
          ) : loadedList.length === 0 ? (
            <p className="text-center text-gray-400 py-10">مفيش منتجات — ضيف الأول من النموذج</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {loadedList.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 py-3">
                  <span className="text-xs text-gray-300 w-5">{i + 1}</span>
                  {p.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.image} className="w-12 h-12 object-cover rounded-lg" alt={p.name} />
                  ) : (
                    <span className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">{p.emoji}</span>
                  )}
                  <div className="grow min-w-0">
                    <p className="text-sm font-bold line-clamp-1">{p.name}</p>
                    <p className="text-xs text-gray-400">{cats.find((c) => c.id === p.category)?.name || p.category}</p>
                  </div>
                  <div className="text-left shrink-0">
                    <p className="text-primary font-bold text-sm">{egp(p.price)}</p>
                    <p className="text-[10px] text-gray-300 line-through">{egp(p.oldPrice)}</p>
                  </div>
                  <span className="text-[10px] bg-accent-red/10 text-accent-red rounded-full px-2 py-0.5 font-bold shrink-0">-{discountOf(p)}%</span>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => { setEditing(p); setForm({ name: p.name, price: String(p.price), oldPrice: String(p.oldPrice), category: p.category, emoji: p.emoji || "🛍️", image: p.image || null }); setUploadPreview(p.image || null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5"
                    >
                      ✏️
                    </button>
                    <button onClick={() => deleteOne(p.id)} className="text-xs bg-red-50 hover:bg-red-100 text-accent-red rounded-lg px-3 py-1.5">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
