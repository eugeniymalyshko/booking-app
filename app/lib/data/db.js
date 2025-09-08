import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "db.json");

export function readDb() {
  console.log("start read Db");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

export function writeDb(nextData) {
  fs.writeFileSync(file, JSON.stringify(nextData, null, 2));
}

// helpers
export function nextId(items) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}
