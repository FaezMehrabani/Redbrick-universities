import Database from "better-sqlite3";

export async function GET() {
  const db = new Database("universities.db");
  const favorites = db.prepare("SELECT * FROM favorites").all();
  db.close();
  return Response.json(favorites, { status: 200 });
}

export async function POST(req: {
  json: () => PromiseLike<{ universityId: any }> | { universityId: any };
}) {
  try {
    const db = new Database("universities.db");

    // Parse request body
    const { universityId } = await req.json();
    if (!universityId) {
      return Response.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    // Check if university exists
    const university: any = db
      .prepare("SELECT * FROM universities WHERE id = ?")
      .get(universityId);
    let mappedUniversity;
    if (!university) {
      return Response.json({ error: "University not found" }, { status: 404 });
    } else {
      mappedUniversity = {
        university_id: university.id,
        name: university.name || "",
        domains: university.domains || [],
        web_pages: university.web_pages || [],
        country: university.country || "",
        alpha_two_code: university.alpha_two_code || "",
        state_province: university.state_province || null,
      };
    }

    // Insert into favorites (if not already added)
    const checkFavorite = db
      .prepare("SELECT * FROM favorites WHERE university_id = ?")
      .get(universityId);

    if (checkFavorite) {
      // If exists, remove from favorites
      db.prepare("DELETE FROM favorites WHERE university_id = ?").run(
        universityId
      );
      db.close();
      return Response.json(
        { message: "Removed from favorites", isFavorite: false },
        { status: 200 }
      );
    } else {
      console.log(mappedUniversity);
      db.prepare(
        `
          INSERT INTO favorites (university_id, name, domains, web_pages, country, alpha_two_code, state_province)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `
      ).run(
        mappedUniversity.university_id,
        mappedUniversity.name,
        mappedUniversity.domains,
        mappedUniversity.web_pages,
        mappedUniversity.country,
        mappedUniversity.alpha_two_code,
        mappedUniversity.state_province
      );
    }

    db.close();
    return Response.json(
      { message: "Added to favorites", isFavorite: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: {
  json: () => PromiseLike<{ universityId: any }> | { universityId: any };
}) {
  try {
    const db = new Database("universities.db");

    // Parse request body
    const { universityId } = await req.json();
    if (!universityId) {
      return Response.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    // Check if university exists in favorites
    const checkFavorite = db
      .prepare("SELECT * FROM favorites WHERE university_id = ?")
      .get(universityId);
    if (!checkFavorite) {
      return Response.json(
        { message: "University not in favorites" },
        { status: 404 }
      );
    }

    // Remove university from favorites
    db.prepare("DELETE FROM favorites WHERE university_id = ?").run(
      universityId
    );
    db.close();

    return Response.json(
      { message: "Removed from favorites", isFavorite: false },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
