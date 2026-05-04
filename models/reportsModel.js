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
        INSERT INTO complaints (post_id, user_id, status, reason_id)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        rep.post_id,
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

ORDER BY c.created_at DESC
LIMIT 4;
    `);

    return rows;
};

exports.getAllReports = async () => {
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

ORDER BY c.created_at DESC;
    `);

    return rows;
};

exports.deleteRep = async (rep_id) => {
 const sql = `
        DELETE FROM complaints
        WHERE id = ?
    `;

    await db.query(sql, [rep_id]);
};