const db = require("../db/index.js");
exports.countPosts = async () => {
    const sql = `
        SELECT COUNT(id) AS countPosts
        FROM posts 
    `;

    const [rows] = await db.query(sql);
    return rows; 
};