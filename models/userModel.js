const db = require("../db/index.js");

exports.createUser = async (user) => {
    const sql = `
        INSERT INTO users (username, email, password, uid, id_r)
        VALUES (?, ?, ?, ?, 2)
    `;
    const [result] = await db.query(sql, [
        user.username,
        user.email,
        user.password,
        user.uid
    ]);
    return result;
};