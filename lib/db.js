// طبقة التخزين — تنسخ مع سيرفر Next.js في كل بيئة محلية وسحابية
// على Vercel الكتابة متاحة فقط في /tmp — لذلك نستخدمه + seed مدموج في الباندل
import fs from "fs";
import os from "os";
import path from "path";
import seedJson from "../data/db.json";

const DB_PATH = path.join(os.tmpdir(), "waf-store-db.json");
const SEED = Array.isArray(seedJson?.products) ? seedJson.products : [];

function writeDB(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // بيئة قراءة فقط (مثل Vercel serverless قبل التوليد الطازج) — نتجاهل بأمان
  }
}

function readDB() {
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    if (Array.isArray(parsed.products)) return parsed;
  } catch {}
  return { products: [...SEED] };
}

export { readDB, writeDB };
