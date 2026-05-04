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

    rr.name AS reason_name,

    u.username AS reporter_name

FROM complaints c

JOIN report_reasons rr ON rr.id = c.reason_id
JOIN users u ON u.id = c.user_id

ORDER BY c.created_at DESC
LIMIT 4;
    `);

    return rows;
};