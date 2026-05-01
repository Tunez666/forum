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


exports.getPosts = async (topicId, userId) => {
    const sql = `
        SELECT 
            p.id,
            p.content,
            p.created_at,

            u.username,
            u.avatarca,

            COUNT(l.id) AS likes_count,

            MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS is_liked

        FROM posts p

        JOIN users u ON u.id = p.author_id
        LEFT JOIN likes l ON l.post_id = p.id

        WHERE p.topic_id = ?
        AND p.is_deleted = 0

        GROUP BY p.id

        ORDER BY p.created_at ASC;
    `;

    const [rows] = await db.query(sql, [userId || 0, topicId]);

    return rows;
};

exports.createPost = async (post) => {
    const sql = `
        INSERT INTO posts (topic_id, author_id, content)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        post.topic_id,
        post.author_id,
        post.content

    ]);
    return result;
};