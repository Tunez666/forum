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
            COUNT(p.id) AS posts_count
        FROM topics t
        JOIN categories c ON t.category_id = c.id
        JOIN users u ON t.author_id = u.id
        LEFT JOIN posts p 
            ON t.id = p.topic_id
            AND p.is_deleted = 0
        GROUP BY
            t.id, t.title, t.created_at,
            c.name, u.username
        ORDER BY t.created_at DESC
        LIMIT 10
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