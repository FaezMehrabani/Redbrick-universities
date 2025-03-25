import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
const db = new Database("universities.db");

const filePath = path.join(
  process.cwd(),
  "./db/world_universities_and_domains.json"
);
const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS universities (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       domains BLOB NOT NULL,
       web_pages BLOB NOT NULL,
       country TEXT NOT NULL,
       alpha_two_code TEXT NOT NULL,
       state_province TEXT NULL
    )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    domains TEXT NOT NULL,
    web_pages TEXT NOT NULL,
    country TEXT NOT NULL,
    alpha_two_code TEXT NOT NULL,
    state_province TEXT NULL
  )
`
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO universities VALUES (
         null,
         @name,
         @domains,
         @web_pages,
         @country,
         @alpha_two_code,
         @state_province
      )
   `);

  const insertMany = db.transaction((universities) => {
    for (const item of universities) {
      const uni = {
        name: item.name,
        domains: JSON.stringify(item.domains),
        web_pages: JSON.stringify(item.web_pages),
        country: item.country,
        alpha_two_code: item.alpha_two_code,
        state_province: item.state_province,
      };
      stmt.run(uni);
    }
  });

  console.log(jsonData);
  insertMany(jsonData);
}

initData();
