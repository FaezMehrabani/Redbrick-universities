// app/api/data/route.js
import Database from "better-sqlite3";

export async function GET(req: { url: string | URL }) {
  try {
    // Open database connection
    const db = new Database("universities.db");

    // Parse query parameters from the request
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || "";
    const name = searchParams.get("name") || "";

    // Prepare SQL query with filters
    let query = "SELECT * FROM universities WHERE 1=1";
    const params = [];

    if (country) {
      query += " AND country LIKE ?";
      params.push(`%${country}%`);
    }
    if (name) {
      query += " AND name LIKE ?";
      params.push(`%${name}%`);
    }

    // Execute the query
    const stmt = db.prepare(query);
    const universities = stmt.all(...params).map((row: any) => ({
      ...row,
      domains: JSON.parse(row.domains),
      web_pages: JSON.parse(row.web_pages),
    }));

    // Close the database connection
    db.close();

    return Response.json(universities, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
