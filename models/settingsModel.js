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

