import mysql from "mysql2/promise";

export async function dbcsatlakozas() {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "konyvtar_db",
    });
}
