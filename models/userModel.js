const db = require("../db/index.js");

exports.createUser = async (user) => {
    const sql = `
        INSERT INTO users (username, email, password, uid, id_r, avatarca)
        VALUES (?, ?, ?, ?, 2, '1778460387572.jpg')
    `;
    const [result] = await db.query(sql, [
        user.username,
        user.email,
        user.password,
        user.uid,
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

exports.countBlocked = async () => {

    const [rows] = await db.query(`
        SELECT COUNT(*) AS total
        FROM blocked_users
    `);

    return rows[0].total;
};

exports.selectUser = async (email) => {

    const sql = `
        SELECT id, username, email, password, id_r, uid, about
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

exports.selectNormalUser = async (id) => {

    const sql = `
        SELECT 
        users.*,
        roles.name AS role_name
        FROM users
        LEFT JOIN roles ON users.id_r = roles.id
        WHERE users.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
};

exports.updateUserInfo = async (userInfo) => {

    console.log(userInfo);

    const sql = `
        UPDATE users
        SET username = ?, uid = ?, about = ?, avatarca = ?
        WHERE id = ?;
    `;
    const [result] = await db.query(sql, [
        userInfo.username,
        userInfo.uid,
        userInfo.about,
        userInfo.avatarca,
        userInfo.id

    ]);
    return result;
};

exports.updatePass = async (user) => {
    const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
    `;

    await db.query(sql, [user.password, user.id]);
};

exports.deleteUser = async (user) => {
    const sql = `
        DELETE FROM users WHERE id = ?
    `;

    await db.query(sql, [user.id]);
};

exports.blockUser = async (user) => {
    const sql = `
        INSERT INTO blocked_users (user_id, blocked_by_id, reason)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        user.user_id,
        user.blocked_by_id,
        user.reason
    ]);
    return result;
};

exports.isUserBlocked = async (userId) => {
    const sql = `
        SELECT id
        FROM blocked_users
        WHERE user_id = ?
        LIMIT 1
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows.length > 0;
};

exports.getAllUsers = async (limit, offset) => {

    const [rows] = await db.query(`
        SELECT
            users.*,
            roles.name AS role_name
        FROM users
        LEFT JOIN roles
            ON users.id_r = roles.id

        ORDER BY users.created_at DESC

        LIMIT ?
        OFFSET ?
    `, [limit, offset]);

    return rows;
};

exports.countUsers = async () => {

    const [rows] = await db.query(`
        SELECT COUNT(id) AS countUsers
        FROM users
    `);

    return rows[0].countUsers;
};

exports.getBlocked = async (limit, offset) => {

    const [rows] = await db.query(`
        SELECT
            bu.id,
            bu.reason,
            bu.created_at,
            bu.expires_at,

            u.id AS user_id,
            u.username,

            b.id AS blocked_by_id,
            b.username AS blocked_by_username

        FROM blocked_users bu

        LEFT JOIN users u
            ON bu.user_id = u.id

        LEFT JOIN users b
            ON bu.blocked_by_id = b.id

        ORDER BY bu.created_at DESC

        LIMIT ?
        OFFSET ?
    `, [limit, offset]);

    return rows;
};

exports.createModer = async (user) => {
    const sql = `
        UPDATE users
        SET id_r = 3
        WHERE id = ?
    `;

    await db.query(sql, [user.id]);
};

exports.createAdmin = async (user) => {
    const sql = `
        UPDATE users
        SET id_r = 1
        WHERE id = ?
    `;

    await db.query(sql, [user.id]);
};

exports.withoutRules = async (user) => {
    const sql = `
        UPDATE users
        SET id_r = 2
        WHERE id = ?
    `;

    await db.query(sql, [user.id]);
};

exports.block = async (user) => {
    const sql = `
        INSERT INTO blocked_users (user_id, blocked_by_id, reason)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        user.user_id,
        user.blocked_by_id,
        user.reason
    ]);
    return result;
};

exports.unblock = async (user) => {
    const sql = `
        DELETE FROM blocked_users WHERE user_id = ?
    `;
    const [result] = await db.query(sql, [
        user.user_id
    ]);
    return result;
};

exports.grafReg = async () => {
    const sql = `
SELECT DATE(created_at) as date, COUNT(*) as users
FROM users
WHERE created_at >= NOW() - INTERVAL 7 DAY
GROUP BY DATE(created_at)
ORDER BY date;
    `;
    const [rows] = await db.query(sql);
    return rows;

};

exports.selectPrUser = async (id) => {

    const sql = `
        SELECT 
        users.*,
        roles.name AS role_name
        FROM users
        LEFT JOIN roles ON users.id_r = roles.id
        WHERE users.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
};

exports.userPostsByDay = async (id) => {

    const sql = `
SELECT 
  DATE(created_at) AS date,
  COUNT(*) AS posts
FROM posts
WHERE author_id = ?
  AND created_at >= CURDATE() - INTERVAL 7 DAY
GROUP BY DATE(created_at)
ORDER BY date;
    `;

    const [rows] = await db.query(sql, [id]);

    return rows;
};

exports.userLikesByDay = async (id) => {

    const sql = `
SELECT 
  DATE(l.created_at) AS date,
  COUNT(*) AS likes
FROM likes l
JOIN posts p ON p.id = l.post_id
WHERE p.author_id = ?
  AND l.created_at >= CURDATE() - INTERVAL 7 DAY
GROUP BY DATE(l.created_at)
ORDER BY date;
    `;

    const [rows] = await db.query(sql, [id]);

    return rows;
};