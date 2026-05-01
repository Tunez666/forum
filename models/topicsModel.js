const db = require("../db/index.js");

exports.countTopics = async () => {
    const sql = `
        SELECT COUNT(id) AS countTopics
        FROM topics 
    `;

    const [rows] = await db.query(sql);
    return rows;
};

exports.getLastTopics = async () => {
    const [rows] = await db.query(`
SELECT 
    t.id,
    t.title,
    t.description,
    t.created_at,

    c.name AS category_name,
    u.username AS author_name,

    COALESCE(p.count_posts, 0) AS posts_count

FROM topics t

JOIN categories c ON c.id = t.category_id
JOIN users u ON u.id = t.author_id

LEFT JOIN (
    SELECT topic_id, COUNT(*) AS count_posts
    FROM posts
    WHERE is_deleted = 0
    GROUP BY topic_id
) p ON p.topic_id = t.id

ORDER BY t.created_at DESC
LIMIT 10;
    `);

    return rows;
};

exports.createTopic = async (topic) => {
    const sql = `
        INSERT INTO topics (title, category_id, author_id, description)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        topic.title,
        topic.category_id,
        topic.author_id,
        topic.description
    ]);
    return result;
};

exports.selectTopic = async (topicId) => {
    const sql = `
         SELECT 
            t.id,
            t.title,
            t.description,
            t.created_at,

            u.id AS author_id,
            u.username AS author_name,
            u.avatarca AS author_avatar

        FROM topics t
        JOIN users u ON u.id = t.author_id
        WHERE t.id = ?
    `;

    const [rows] = await db.query(sql, [topicId]);
    return rows[0];
};