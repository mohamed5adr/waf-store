// طبقة التخزين — تنسخ مع سيرفر Next.js في كل بيئة محلية وسحابية
// على Vercel الكتابة متاحة فقط في /tmp — لذلك نستخدمه + seed مدموج في الباندل
import fs from "fs";
import os from "os";
import path from "path";
import seedJson from "../data/db.json";

const DB_PATH = path.join(os.tmpdir(), "waf-store-db.json");
const SEED = Array.isArray(seedJson?.products) ? seedJson.products : [];

// بيانات دخول الأدمن الافتراضية — اليوزرنيم والباسورد زي بعض (0000)
export const DEFAULT_ADMIN = { username: "0000", password: "0000" };

function writeDB(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // بيئة قراءة فقط — نتجاهل بأمان
  }
}

function readDB() {
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    if (Array.isArray(parsed.products)) {
      return {
        products: parsed.products,
        admin: parsed.admin && parsed.admin.username ? parsed.admin : { ...DEFAULT_ADMIN },
      };
    }
  } catch {}
  return { products: [...SEED], admin: { ...DEFAULT_ADMIN } };
}

export { readDB, writeDB };
