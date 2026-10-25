import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// GET — كل المنتجات
export async function GET() {
  const db = readDB();
  return NextResponse.json({ products: db.products });
}

// POST — إضافة منتج جديد
export async function POST(req) {
  const body = await req.json();
  const db = readDB();
  const id = Date.now();
  const price = Number(body.price) || 0;
  const product = {
    id,
    name: String(body.name || "منتج جديد"),
    price,
    oldPrice: Number(body.oldPrice) || price,
    category: body.category || "tangt",
    emoji: body.emoji || "🛍️",
    image: body.image || null,
    g: id % 8,
  };
  db.products.unshift(product);
  writeDB(db);
  return NextResponse.json({ product });
}

// DELETE — حذف كل المنتجات
export async function DELETE() {
  writeDB({ products: [] });
  return NextResponse.json({ ok: true });
}
