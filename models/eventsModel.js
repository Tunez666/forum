const db = require("../db/index.js");

exports.getLastEvents = async () => {
    const [rows] = await db.query(`
        SELECT id, name, description, datee
        FROM events
        ORDER BY datee 
        LIMIT 3
    `);

    return rows;
};
exports.createEvent = async (event) => {
    const sql = `
        INSERT INTO events (name, description, datee, id_u)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        event.name,
        event.description,
        event.datee,
        event.id_u
    ]);
    return result;
};

exports.updateEvent = async (event) => {
    const sql = `
        UPDATE events
        SET name = ?, description = ?, datee = ?, id_u = ?
        WHERE id = ?
    `;

    await db.query(sql, [
        event.name,
        event.description,
        event.datee,
        event.id_u,
        event.id
    ]);
};

exports.DeleteEvent = async (id) => {
    const sql = `
        DELETE FROM events
        WHERE id = ?
    `;

    await db.query(sql, [id]);
};