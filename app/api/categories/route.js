import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// GET — قائمة الأقسام
export async function GET() {
  const db = readDB();
  return NextResponse.json({ categories: db.categories });
}

// POST — إضافة قسم جديد (اسم + إيموجي اختياري + صورة غلاف اختيارية)
export async function POST(req) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  if (name.length < 2) {
    return NextResponse.json({ error: "اكتب اسم القسم (حرفين على الأقل)" }, { status: 400 });
  }
  const db = readDB();
  if (db.categories.some((c) => c.name === name)) {
    return NextResponse.json({ error: "فيه قسم بنفس الاسم بالفعل" }, { status: 400 });
  }
  const cat = {
    id: `c${Date.now()}`,
    name,
    emoji: String(body.emoji || "").trim() || "🛍️",
    image: body.image || null,
  };
  db.categories.push(cat);
  writeDB(db);
  return NextResponse.json({ ok: true, category: cat });
}
