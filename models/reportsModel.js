const db = require("../db/index.js");

exports.getReportReasons = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM report_reasons 
    `);

    return rows;
};

exports.createReport = async (rep) => {
    const sql = `
        INSERT INTO complaints (post_id, topic_id, user_id, status, reason_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        rep.post_id || null,
        rep.topic_id || null,
        rep.user_id,
        rep.status,
        rep.reason_id


    ]);
    return result;
};

exports.getFourReports = async () => {
    const [rows] = await db.query(`
SELECT 
    c.id,
    c.post_id,
    c.topic_id,
    c.status,
    c.created_at,
    c.reason_id,

    rr.name AS reason_name,

    reporter.username AS reporter_name,

    -- пост (если есть)
    p.content AS post_text,
    author_post.id AS post_author_id,
    author_post.username AS post_author_name,

    -- топик (если есть)
    t.title AS topic_title,
    t.description AS topic_text,
    author_topic.id AS topic_author_id,
    author_topic.username AS topic_author_name

FROM complaints c

LEFT JOIN posts p ON p.id = c.post_id
LEFT JOIN topics t ON t.id = c.topic_id

JOIN report_reasons rr ON rr.id = c.reason_id
JOIN users reporter ON reporter.id = c.user_id

LEFT JOIN users author_post ON author_post.id = p.author_id
LEFT JOIN users author_topic ON author_topic.id = t.author_id

ORDER BY c.created_at DESC
LIMIT 4;
    `);

    return rows;
};

exports.getPostReports = async (limit, offset) => {
    const [rows] = await db.query(`
        SELECT
            c.id AS cId,
            c.post_id,
            c.status,
            c.created_at,

            p.content AS post_text,

            rr.name AS reason_name,

            reporter.username AS reporter_name,
            author.id AS post_author_id,
            author.username AS post_author_name

        FROM complaints c

        JOIN posts p ON p.id = c.post_id
        JOIN report_reasons rr ON rr.id = c.reason_id

        JOIN users reporter ON reporter.id = c.user_id
        JOIN users author ON author.id = p.author_id

        WHERE c.post_id IS NOT NULL

        ORDER BY c.created_at DESC

        LIMIT ? OFFSET ?
    `, [limit, offset]);

    return rows;
};

exports.countPostReports = async () => {
    const [[row]] = await db.query(`
        SELECT COUNT(*) AS total
        FROM complaints
        WHERE post_id IS NOT NULL
    `);

    return row.total;
};


exports.getTopReports = async (limit, offset) => {
    const [rows] = await db.query(`
        SELECT 
            c.id AS cId,
            c.topic_id,
            c.status,
            c.created_at,

            t.title AS topic_title,
            t.description AS topic_text,

            rr.name AS reason_name,

            reporter.username AS reporter_name,
            author.id AS topic_author_id,
            author.username AS topic_author_name

        FROM complaints c

        JOIN topics t ON t.id = c.topic_id
        JOIN report_reasons rr ON rr.id = c.reason_id

        JOIN users reporter ON reporter.id = c.user_id
        JOIN users author ON author.id = t.author_id

        WHERE c.topic_id IS NOT NULL

        ORDER BY c.created_at DESC

        LIMIT ? OFFSET ?
    `, [limit, offset]);

    return rows;
};

exports.countTopicReports = async () => {
    const [[row]] = await db.query(`
        SELECT COUNT(*) AS total
        FROM complaints
        WHERE topic_id IS NOT NULL
    `);

    return row.total;
};

exports.deleteRep = async (rep_id) => {
    const sql = `
        DELETE FROM complaints
        WHERE id = ?
    `;

    await db.query(sql, [rep_id]);
};

