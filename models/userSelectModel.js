const db = require("../db/index.js");

exports.selectUser = async (email) => {

    const sql = `
        SELECT id, username, email, password 
        FROM users 
        WHERE username = ? OR email = ?
        LIMIT 1
    `;

    const [rows] = await db.query(sql, [email, email]);

    return rows[0]; // возвращаем одного пользователя
};