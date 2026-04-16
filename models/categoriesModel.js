const db = require("../db/index.js");

exports.countCategories = async () => {
    const sql = `
        SELECT COUNT(id) AS countCategories
        FROM categories 
    `;
    const [rows] = await db.query(sql);
    return rows;
};

exports.getCategories = async () => {
    const [rows] = await db.query(`
        SELECT id, name, description
        FROM categories
    `);

    return rows;
};

exports.countTopicsByCategory = async (categoryId) => {
    const [rows] = await db.query(`
        SELECT COUNT(*) AS total
        FROM topics
        WHERE category_id = ?
    `, [categoryId]);

    return rows[0].total;
};

exports.countPostsByCategory = async (categoryId) => {
    const [rows] = await db.query(`
        SELECT COUNT(posts.id) AS total
        FROM posts
        INNER JOIN topics ON posts.topic_id = topics.id
        WHERE topics.category_id = ?
        AND posts.is_deleted = 0
    `, [categoryId]);

    return rows[0].total;
};

exports.createCategotie = async (cate) => {
    const sql = `
        INSERT INTO categories (name, description)
        VALUES (?, ?)
    `;
    const [result] = await db.query(sql, [
        cate.name,
        cate.description
    ]);
    return result;
};

exports.updateCategories = async (cat) => {
    const sql = `
        UPDATE categories
        SET name = ?, description = ?
        WHERE id = ?
    `;

    await db.query(sql, [
        cat.name,
        cat.description,
        cat.id
    ]);
};

exports.deleteCat = async (id) => {
    const sql = `
        DELETE FROM categories
        WHERE id = ?
    `;

    await db.query(sql, [id]);
};