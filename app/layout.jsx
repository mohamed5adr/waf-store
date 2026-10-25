import { Almarai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/lib/cart";
import { store } from "@/lib/data";

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${almarai.variable} bg-gray-50 antialiased`}>
        <CartProvider>
          <div className="app_container flex flex-1 flex-col relative min-h-screen">
            <Header />
            <main className="mx-auto py-8 px-4 sm:py-10 sm:px-6 xl:max-w-7xl max-w-full w-full">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: store.title,
  description: "متجر إلكتروني لبيع الملابس أونلاين — شحن مجاني ومعاينة قبل الاستلام",
};
