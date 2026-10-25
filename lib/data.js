// بيانات تجريبية للمتجر — بدّلها بسهولة ببياناتك الحقيقية لاحقًا
export const store = {
  name: "متجر تسوّق",
  title: "متجر تسوّق | التسوق أونلاين",
  currency: "ج.م",
};

export const categories = [
  { id: "tangt", name: "ترنجات", emoji: "👔" },
  { id: "shirts", name: "قمصان", emoji: "🧑‍💼" },
  { id: "tshirts", name: "تيشيرتات", emoji: "👕" },
  { id: "suits", name: "أطقم", emoji: "🥻" },
  { id: "pants", name: "بناطيل", emoji: "👖" },
  { id: "outer", name: "جاكيتات", emoji: "🧥" },
];

export const products = [
  { id: 1, name: "ترنج بولو كلاسيك", price: 625, oldPrice: 999, category: "tangt", emoji: "👔", g: 0, soldBadge: "الأكثر مبيعاً" },
  { id: 2, name: "ترنج R12 عصري", price: 700, oldPrice: 1350, category: "tangt", emoji: "🧥", g: 1 },
  { id: 3, name: "ترنج سواريه فاخر", price: 700, oldPrice: 1350, category: "tangt", emoji: "🕴️", g: 2 },
  { id: 4, name: "قميص اكسفورد مقلم عريض", price: 520, oldPrice: 999, category: "shirts", emoji: "🧑‍💼", g: 3 },
  { id: 5, name: "طقم بسكوتة نص سوستة", price: 570, oldPrice: 1200, category: "suits", emoji: "🥻", g: 4 },
  { id: 6, name: "سوت بيزك نص سوستة", price: 1000, oldPrice: 1850, category: "suits", emoji: "🥼", g: 5 },
  { id: 7, name: "ترنج كاجوال زرارير", price: 670, oldPrice: 1050, category: "tangt", emoji: "👕", g: 6 },
  { id: 8, name: "تيشيرت كاجوال نص سوستة", price: 570, oldPrice: 999, category: "tshirts", emoji: "👕", g: 7 },
  { id: 9, name: "قميص كتان صيفي", price: 480, oldPrice: 780, category: "shirts", emoji: "🧑‍💼", g: 8 },
  { id: 10, name: "بنطلون قماش واسع", price: 640, oldPrice: 1100, category: "pants", emoji: "👖", g: 9 },
  { id: 11, name: "جاكيت شتوي مبطن", price: 1150, oldPrice: 1900, category: "outer", emoji: "🧥", g: 10 },
  { id: 12, name: "طقم رياضي كامل", price: 820, oldPrice: 1400, category: "suits", emoji: "🥻", g: 11 },
  { id: 13, name: "ترنج مخطط0025", price: 590, oldPrice: 950, category: "tangt", emoji: "🕴️", g: 12 },
  { id: 14, name: "تيشيرت Oversize قطن", price: 350, oldPrice: 560, category: "tshirts", emoji: "👕", g: 13 },
  { id: 15, name: "بنطلون جينز سكيني", price: 560, oldPrice: 900, category: "pants", emoji: "👖", g: 14 },
  { id: 16, name: "قميص بولو مخروط", price: 610, oldPrice: 970, category: "shirts", emoji: "🧑‍💼", g: 15 },
];

export const sizes = ["S", "M", "L", "XL", "XXL"];

export const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
  "الغربية", "بني سويف", "الفيوم", "المنيا", "أسيوط", "سوهاج",
  "قنا", "الأقصر", "أسوان", "البحر الأحمر", "مطروح", "شمال سيناء",
  "جنوب سيناء", "كفر الشيخ", "الدمياط", "بورسعيد", "الإسماعيلية",
  "السويس", "الوادي الجديد",
];

export const reviews = [
  { name: "أحمد جمال", title: "تجربة عامة مع المتجر", text: "أكتر حاجة عجبتني في المتجر هي تنوع المنتجات وجودتها العالية. الطلب وصلني في أقل من 3 أيام والتغليف كان ممتاز. أكيد مش آخر مرة أطلب." },
  { name: "ندى مصطفى", title: "مراجعة على البراند", text: "البراند فعلاً يستحق التجربة، كل حاجة مرتبة من أول التصفح لحد استلام الطلب. والأسعار مقارنة بالجودة تعتبر ممتازة." },
  { name: "أميرة خالد", title: "الطلب والتوصيل", text: "دي تاني مرة أطلب من المتجر، وكل مرة الشحن بيكون في معاده، والمنتج زي الصور بالظبط. بحب مصداقيتهم." },
  { name: "ياسر عبد الحميد", title: "تجربة الشراء بشكل عام", text: "المتجر بقى المفضل عندي لما أحب أطلب ملابس أو أطقم أڤر سايز. ريّحوني في المقاسات والخامات أصلًا مريحة جدًا." },
];

export const features = [
  { title: "وصول آمن", text: "نضمن لك وصول المنتجات بشكل جيد وسليم.", emoji: "🛡️" },
  { title: "معاينة مجانية", text: "إمكانية المعاينة والتأكد من المنتج قبل الاستلام.", emoji: "🔍" },
  { title: "شحن مجاني", text: "الشحن متاح مجانًا لجميع الأماكن المدعومة داخل مصر.", emoji: "🚚" },
  { title: "تخفيضات قوية", text: "عروض حصرية بخصومات تصل حتى 50% على العديد من المنتجات.", emoji: "🏷️" },
];

export const discountOf = (p) => Math.round((1 - p.price / p.oldPrice) * 100);
export const egp = (n) => `${n} ج.م`;

// كوبونات تجريبية — ضيف كوبوناتك هنا
export const coupons = {
  WELCOME10: { type: "percent", value: 10 }, // خصم 10%
  SAVE50: { type: "fixed", value: 50 }, // خصم 50 ج.م
};
