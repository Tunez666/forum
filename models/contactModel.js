const db = require("../db/index.js");

exports.createContact = async (con) => {
    const sql = `
        INSERT INTO contacts (name, email, theme, message, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        con.name,
        con.email,
        con.theme,
        con.message,
        con.status
    ]);
    return result;
};