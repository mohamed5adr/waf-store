import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// PUT — تعديل قسم (اسم / إيموجي / صورة الغلاف)
export async function PUT(req, { params }) {
  const body = await req.json();
  const db = readDB();
  const cat = db.categories.find((c) => c.id === params.id);
  if (!cat) return NextResponse.json({ error: "القسم مش موجود" }, { status: 404 });

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (name.length < 2) return NextResponse.json({ error: "اسم القسم قصير جدًا" }, { status: 400 });
    if (db.categories.some((c) => c.id !== cat.id && c.name === name)) {
      return NextResponse.json({ error: "فيه قسم تاني بنفس الاسم" }, { status: 400 });
    }
    cat.name = name;
  }
  if (body.emoji !== undefined) cat.emoji = String(body.emoji).trim() || "🛍️";
  if (body.image !== undefined) cat.image = body.image || null;

  writeDB(db);
  return NextResponse.json({ ok: true, category: cat });
}

// DELETE — حذف قسم (يترفض لو فيه منتجات جواه)
export async function DELETE(req, { params }) {
  const db = readDB();
  const cat = db.categories.find((c) => c.id === params.id);
  if (!cat) return NextResponse.json({ error: "القسم مش موجود" }, { status: 404 });

  const count = db.products.filter((p) => p.category === cat.id).length;
  if (count > 0) {
    return NextResponse.json(
      { error: `القسم فيه ${count} منتج — انقلهم لقسم تاني أو امسحهم الأول` },
      { status: 400 }
    );
  }

  db.categories = db.categories.filter((c) => c.id !== cat.id);
  writeDB(db);
  return NextResponse.json({ ok: true });
}
