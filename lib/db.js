// طبقة التخزين الدائم (سيرفر) — تقرأ/تكتب الملف data/db.json
import fs from "fs";
import path from "path";
import { products as seed } from "./data";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function writeDB(db) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

function readDB() {
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    if (Array.isArray(parsed.products)) return parsed;
  } catch {}
  writeDB({ products: seed }); // أول تشغيل → زرع البيانات التجريبية
  return { products: seed };
}

export { readDB, writeDB };
