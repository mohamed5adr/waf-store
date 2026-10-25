"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { discountOf, egp } from "@/lib/data";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col w-full snap-start">
      <Link href={`/products/${product.id}`} className="block relative">
        <ProductImage product={product} />
        <span className="absolute top-2 right-2 bg-accent-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discountOf(product)}%
        </span>
      </Link>
      <div className="p-3 flex flex-col grow">
        <Link href={`/products/${product.id}`} className="text-sm md:text-[15px] font-semibold leading-6 line-clamp-2 hover:text-primary">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-primary font-extrabold">{egp(product.price)}</span>
          <span className="text-gray-400 text-xs line-through">{egp(product.oldPrice)}</span>
        </div>
        <button
          onClick={() => add(product)}
          className="mt-3 w-full bg-primary text-white text-sm font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          أضف للسلة
        </button>
      </div>
    </div>
  );
}
