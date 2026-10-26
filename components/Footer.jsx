"use client";

import Link from "next/link";
import { store } from "@/lib/data";
import { useCategories } from "@/lib/hooks";

function Disclosure({ title, children }) {
  const open = () => {
    const el = document.getElementById(`dd-${title}`);
    el?.classList.toggle("hidden");
  };
  return (
    <div className="border-t border-[#E2E2E2]">
      <button onClick={open} className="flex justify-between items-center w-full py-5 text-right" type="button">
        <h3 className="font-bold text-base">{title}</h3>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 transition-transform duration-200 -rotate-90">
          <path d="M15.5 19C15.5 19 8.5 14.856 8.5 12C8.5 9.145 15.5 5 15.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={`dd-${title}`} className="hidden pb-4 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const { categories } = useCategories();
  const cats = categories || [];
  return (
    <footer className="bg-white text-[#010101]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:hidden">
          <Disclosure title="الأقسام">
            {cats.map((c) => (
              <Link key={c.id} href={`/collections/${c.id}`} className="text-sm text-gray-600 hover:text-primary py-1">
                {c.name}
              </Link>
            ))}
          </Disclosure>
          <Disclosure title="الصفحات">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary py-1">الرئيسية</Link>
            <Link href="/collections" className="text-sm text-gray-600 hover:text-primary py-1">جميع الأقسام</Link>
            <Link href="/cart" className="text-sm text-gray-600 hover:text-primary py-1">سلة التسوق</Link>
            <Link href="/pages" className="text-sm text-gray-600 hover:text-primary py-1">من نحن</Link>
            <Link href="/admin" className="text-sm text-gray-600 hover:text-primary py-1">⚙️ لوحة الأدمن</Link>
          </Disclosure>
          <p className="text-center text-xs text-gray-400 mt-8 pb-16 lg:pb-0">
            © {new Date().getFullYear()} {store.name} — جميع الحقوق محفوظة
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{store.name}</h3>
            <p className="text-sm text-gray-500 leading-7">متجر إلكتروني لبيع الملابس بأفضل الأسعار، شحن مجاني لجميع المحافظات، وإمكانية المعاينة قبل الاستلام.</p>
          </div>
          <div>
            <h3 className="font-bold text-base mb-4">الأقسام</h3>
            <ul className="space-y-2">
              {cats.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.id}`} className="text-sm text-gray-600 hover:text-primary">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-4">الصفحات</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-primary">الرئيسية</Link></li>
              <li><Link href="/collections" className="text-sm text-gray-600 hover:text-primary">جميع الأقسام</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-600 hover:text-primary">سلة التسوق</Link></li>
              <li><Link href="/pages" className="text-sm text-gray-600 hover:text-primary">من نحن</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📞 01000000000</li>
              <li>✉️ info@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
