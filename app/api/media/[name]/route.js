import fs from "fs";
import os from "os";
import path from "path";

// GET — تقديم صورة مرفوعة (من /tmp/uploads) بميم تايب صحيح
const MIME = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

export async function GET(req, { params }) {
  const name = String(params.name).replace(/[^a-zA-Z0-9._-]/g, "");
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  const file = path.join(os.tmpdir(), "waf-uploads", name);
  try {
    const data = fs.readFile(file);
    return new Response(await data, {
      headers: { "Content-Type": MIME[ext] || "application/octet-stream" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
