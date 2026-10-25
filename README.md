# متجر تسوّق 🛍️

متجر إلكتروني كامل (Next.js + Tailwind CSS) — تصميم عربي RTL بنفس ستايل متاجر Easy Orders.

## التشغيل (خطوتين بس)

1. افتح Terminal من فوق في VS Code: **Terminal → New Terminal** (أو `Ctrl + ~`)
2. اكتب:

```bash
npm run dev
```

وبعدها افتح: **http://localhost:3000**

> لو أول مرة أو بعد تنزيل المشروع جديد: شغّل `npm install` الأول مرة واحدة بس.
> لو ظهرلك `node not recognized`: اقفل الـ terminal وافتحه تاني (أو أعد تشغيل VS Code).

## فاينل الحاجات المهمة؟

| عايز تغيّر | الملف |
|---|---|
| المنتجات / الأقسام / الأسعار / الاسم / المراجعات | `lib/data.js` |
| الألوان والخط | `app/globals.css` (أول 5 سطور) |
| صور المنتجات | بدّل مكوّن `components/ProductImage.jsx` أو حط صورك في `public/` |
| الهيدر | `components/Header.jsx` |
| الفوتر والقائمة السفلية للموبايل | `components/Footer.jsx` / `components/MobileNav.jsx` |
| منطق السلة (إضافة/حذف/حفظ) | `lib/cart.jsx` |
| نموذج الطلب والتحقق | `app/checkout/page.jsx` |

## الصفحات

- `/` الرئيسية (بانر، أقسام، الأكثر مبيعاً، أحدث المنتجات، مقترحة لك، آراء، مميزات)
- `/products/[id]` تفاصيل منتج (مقاسات، أضف للسلة، اشترِ الآن)
- `/collections` و `/collections/[slug]` الأقسام
- `/search?q=...` البحث
- `/cart` سلة التسوق (محفوظة في localStorage)
- `/checkout` إتمام الطلب + شاشة نجاح برقم طلب
- `/pages` صفحات معلومات

## الملاحظات

- بيانات وصور العرض تجريبية (placeholders) — بدّلها ببياناتك الحقيقية في `lib/data.js`.
- الدفع حاليًا "كاش عند الاستلام" — للتوسيع (أونلاين دفع/كوبونات/حسابات مستخدمين) قسّم `lib/data.js` لـ API.
