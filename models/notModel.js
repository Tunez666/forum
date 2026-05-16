const db = require("../db/index.js");

exports.userNotifications = async (userId) => {
    const sql = `
    SELECT
    n.*,
    u.username,
    u.avatarca
FROM notifications n
JOIN users u ON u.id = n.sender_id
WHERE n.user_id = ?
ORDER BY n.created_at DESC
LIMIT 10;
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;

};