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

exports.countUser = async () => {
    const sql = `
        SELECT COUNT(id) AS countUsers
        FROM users 
    `;

    const [rows] = await db.query(sql);
    return rows; 
};

exports.selectUser = async (email) => {

    const sql = `
        SELECT id, username, email, password, id_r
        FROM users 
        WHERE username = ? OR email = ?
        LIMIT 1
    `;

    const [rows] = await db.query(sql, [email, email]);

    return rows[0]; // возвращаем одного пользователя
};

exports.getLastUsers = async () => {
    const [rows] = await db.query(`
        SELECT id, username, email, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT 4
    `);

    return rows;
};

exports.countModerators = async () => {
    const sql = `
        SELECT COUNT(id) AS countModerators
        FROM users 
        Where id_r = 3
    `;

    const [rows] = await db.query(sql);
    return rows; 
};