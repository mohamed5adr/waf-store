"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { coupons } from "@/lib/data";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null); // { code, type, value }

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(saved)) setItems(saved);
      const savedCoupon = JSON.parse(localStorage.getItem("coupon") || "null");
      if (savedCoupon?.code && coupons[savedCoupon.code]) setCoupon(savedCoupon);
    } catch {}
  }, []);

  const save = (next) => {
    setItems(next);
    try {
      localStorage.setItem("cart", JSON.stringify(next));
    } catch {}
  };

  const add = (product, size = "M", qty = 1) => {
    const key = `${product.id}-${size}`;
    const existing = items.find((i) => i.key === key);
    if (existing) {
      save(items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)));
    } else {
      save([...items, { key, id: product.id, name: product.name, price: product.price, oldPrice: product.oldPrice, emoji: product.emoji, g: product.g, size, qty }]);
    }
  };

  const setQty = (key, qty) => {
    if (qty <= 0) save(items.filter((i) => i.key !== key));
    else save(items.map((i) => (i.key === key ? { ...i, qty } : i)));
  };

  const remove = (key) => save(items.filter((i) => i.key !== key));
  const clear = () => {
    save([]);
    resetCoupon();
  };

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  // الكوبونات
  const applyCoupon = (code) => {
    const c = coupons[code.trim().toUpperCase()];
    if (!c) return false;
    setCoupon({ code: code.trim().toUpperCase(), ...c });
    try {
      localStorage.setItem("coupon", JSON.stringify({ code: code.trim().toUpperCase(), ...c }));
    } catch {}
    return true;
  };

  const resetCoupon = () => {
    setCoupon(null);
    try {
      localStorage.removeItem("coupon");
    } catch {}
  };

  const discount = coupon
    ? coupon.type === "percent" ? Math.round(total * (coupon.value / 100)) : Math.min(total, coupon.value)
    : 0;
  const finalTotal = Math.max(0, total - discount);

  return (
    <CartContext.Provider
      value={{ items, add, setQty, remove, clear, count, total, discount, finalTotal, coupon, applyCoupon, resetCoupon }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
