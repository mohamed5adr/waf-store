"use client";

export default function PagesInfo() {
  const sections = [
    {
      title: "من نحن",
      body: "متجر إلكتروني متخصص في الملابس الفاشون للرجال والنساء بأفضل الأسعار. بنوفر أحدث الصيحات بجودة عالية وأسعار في متناول الكل.",
    },
    {
      title: "سياسة الشحن والتوصيل",
      body: "الشحن مجاني لجميع المحافظات المدعومة. المدة من 2 إلى 5 أيام عمل حسب المحافظة، وهيبقى فيه معاينة مجانية للمنتج قبل الاستلام.",
    },
    {
      title: "سياسة الاستبدال والاسترجاع",
      body: "تقدر تطلب استبدال المنتج في حالة وجود صناعة أو مشكلة — أول 14 يوم من الاستلام. الاستبدال للأسباب الشخصية بإمكانية التواصل مع خدمة العملاء.",
    },
    {
      title: "اتصل بنا",
      body: "خدمة العملاء متاحة من 10 صباحًا لـ 10 مساءً على طول الأسبوع.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="font-extrabold text-2xl mb-2">الصفحات</h1>
      {sections.map((s) => (
        <section key={s.title} className="bg-white rounded-xl border border-black/5 shadow-sm p-5">
          <h2 className="font-bold mb-2">{s.title}</h2>
          <p className="text-sm text-gray-600 leading-7">{s.body}</p>
        </section>
      ))}
    </div>
  );
}
