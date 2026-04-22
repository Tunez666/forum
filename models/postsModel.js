const db = require("../db/index.js");
exports.countPosts = async () => {
    const sql = `
        SELECT COUNT(id) AS countPosts
        FROM posts 
    `;

    const [rows] = await db.query(sql);
    return rows;
};

exports.topPosts = async () => {
    const sql = `
        SELECT 
    u.id,
    u.username,
    COUNT(p.id) AS posts_count
FROM users u

JOIN posts p 
    ON u.id = p.author_id
    AND p.is_deleted = 0

GROUP BY u.id, u.username

ORDER BY posts_count DESC

LIMIT 5;
    `;

    const [rows] = await db.query(sql);
    return rows;
};