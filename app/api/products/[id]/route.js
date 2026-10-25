import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// PUT — تعديل منتج
export async function PUT(req, { params }) {
  const db = readDB();
  const idx = db.products.findIndex((p) => String(p.id) === params.id);
  if (idx === -1) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });

  const body = await req.json();
  db.products[idx] = {
    ...db.products[idx],
    ...(body.name !== undefined ? { name: String(body.name) } : {}),
    ...(body.price !== undefined ? { price: Number(body.price) } : {}),
    ...(body.oldPrice !== undefined ? { oldPrice: Number(body.oldPrice) } : {}),
    ...(body.category !== undefined ? { category: String(body.category) } : {}),
    ...(body.emoji !== undefined ? { emoji: String(body.emoji) } : {}),
    ...(body.image !== undefined ? { image: body.image } : {}),
  };
  writeDB(db);
  return NextResponse.json({ product: db.products[idx] });
}

// DELETE — حذف منتج واحد
export async function DELETE(req, { params }) {
  const db = readDB();
  db.products = db.products.filter((p) => String(p.id) !== params.id);
  writeDB(db);
  return NextResponse.json({ ok: true });
}
