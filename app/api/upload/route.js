import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// POST — رفع صورة منجت إلى public/uploads
export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "مفيش ملف" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "الصورة أكبر من 5MB" }, { status: 400 });
  }
  const rawExt = (file.name?.split(".").pop() || "jpg").toLowerCase();
  const ext = /^([a-z0-9]{2,5})$/.test(rawExt) ? rawExt : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), bytes);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
