const db = require("../db/index.js");

exports.selectSettings = async () => {

  const [rows] = await db.query(`
        SELECT *
        FROM setings
        WHERE id = 1
    `);

    return rows;
};

exports.updateVersion = async (settings) => {

    console.log(settings);

    const sql = `
        UPDATE setings
        SET version = ?, id_u = ?
        WHERE id = 1;
    `;
    const [result] = await db.query(sql, [
        settings.version,
        settings.id_u
    ]);
    return result;
};

exports.updateCharacter = async (settings) => {
    const sql = `
        UPDATE setings
        SET patch = ?
        WHERE id = 1
    `;

    await db.query(sql, [settings.patch]);
};

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