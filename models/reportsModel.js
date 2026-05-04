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