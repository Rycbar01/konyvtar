import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors()); // engedélyezzük a React fetch-et

// Adatbázis csatlakozás
async function dbcsatlakozas() {
  try {
    const conn = await mysql.createConnection({ 
      host: "localhost",
      user: "root",          // phpMyAdmin felhasználó
      password: "",          // ha nincs jelszó, üres string
      database: "konyvtar_db",
      charset: "utf8",
    });
    console.log("Sikeres csatlakozás az adatbázishoz!");
    return conn;
  } catch (err) {
    console.error("Hiba az adatbázis csatlakozásakor:", err);
    return null;
  }
}

// API endpoint a könyvekhez
app.get("/api/konyvek", async (req, res) => {
  const conn = await dbcsatlakozas();
  if (!conn) {
    return res.status(500).json({ error: "Nem sikerült csatlakozni az adatbázishoz." });
  }

  try {
    const [rows] = await conn.query("SELECT * FROM books");
    await conn.end();
    console.log("Lekérdezés sikeresen lefutott:", rows.length, "sor");
    res.json(rows);
  } catch (err) {
    console.error("Hiba a lekérdezés során:", err);
    res.status(500).json({ error: "Hiba a lekérdezés során" });
  }
});

// Szerver indítása
app.listen(3000, () => console.log("API fut a 3000-es porton"));
