import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// POST — تحقق من بيانات دخول الأدمن
export async function POST(req) {
  const { username, password } = await req.json();
  const db = readDB();
  if (username === db.admin.username && password === db.admin.password) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "اسم المستخدم أو كلمة السر غير صحيحة" }, { status: 401 });
}

// PUT — تغيير اليوزرنيم والباسورد (بالقديم + الجديد)
export async function PUT(req) {
  const { oldUsername, oldPassword, newUsername, newPassword } = await req.json();
  const db = readDB();

  if (oldUsername !== db.admin.username || oldPassword !== db.admin.password) {
    return NextResponse.json({ error: "البيانات القديمة غير صحيحة" }, { status: 401 });
  }
  if (!newUsername?.trim() || !newPassword?.trim()) {
    return NextResponse.json({ error: "اكتب اليوزرنيم والباسورد الجديدين" }, { status: 400 });
  }
  if (newPassword.length < 4 || newUsername.trim().length < 4) {
    return NextResponse.json({ error: "الجديد لازم 4 خانات على الأقل" }, { status: 400 });
  }
  if (newPassword === "0000" && newUsername.trim() === "0000") {
    return NextResponse.json({ error: "ماينفعش ترجع للبيانات الافتراضية 0000" }, { status: 400 });
  }

  db.admin = { username: newUsername.trim(), password: newPassword };
  writeDB(db);
  return NextResponse.json({ ok: true });
}
