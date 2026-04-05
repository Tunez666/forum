const db = require("../db/index.js");

exports.countTopics = async () => {
    const sql = `
        SELECT COUNT(id) AS countTopics
        FROM topics 
    `;

    const [rows] = await db.query(sql);
    return rows; 
};