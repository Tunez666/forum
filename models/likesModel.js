const db = require("../db/index.js");

exports.toggleLike = async (userId, postId) => {

    const [rows] = await db.query(
        "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
        [userId, postId]
    );

    if (rows.length > 0) {

        await db.query(
            "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
            [userId, postId]
        );
        return { liked: false };
    } else {

        await db.query(
            "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
            [userId, postId]
        );
        return { liked: true };
    }


};

exports.userLikes = async (userId) => {
    const sql = `
        SELECT 
    u.id,
    u.username,
    COUNT(l.id) AS total_likes
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
LEFT JOIN likes l ON l.post_id = p.id
WHERE u.id = ?
GROUP BY u.id, u.username;
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;

};