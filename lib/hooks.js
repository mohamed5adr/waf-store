"use client";

// Hook لجلب المنتجات من السيرفر (البيانات المحفوظة من لوحة التحكم)
import { useCallback, useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState(null); // null = لسه بنجيب
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    return fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setProducts(d.products || []);
        setError(null);
      })
      .catch((e) => setError(String(e)));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { products, error, reload };
}

// Hook لجلب الأقسام من السيرفر (بإدارة لوحة التحكم — إضافة/حذف/صور غلاف)
export function useCategories() {
  const [categories, setCategories] = useState(null); // null = لسه بنجيب
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    return fetch("/api/categories")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setCategories(d.categories || []);
        setError(null);
      })
      .catch((e) => setError(String(e)));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { categories, error, reload };
}
