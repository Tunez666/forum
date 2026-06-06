const db = require("../db/index.js");

exports.countCategories = async () => {
    const sql = `
        SELECT COUNT(id) AS countCategories
        FROM categories 
    `;
    const [rows] = await db.query(sql);
    return rows;
};

exports.countParents = async () => {
    const [rows] = await db.query(`
        SELECT COUNT(id) AS countParents
        FROM categories
        WHERE parent_id IS NULL
    `);
    return rows;
};

exports.getCategories = async () => {
    const [rows] = await db.query(`
        SELECT id, name, description, parent_id
        FROM categories
    `);

    return rows;
};

exports.getParentsWithStats = async (limit, offset) => {
    const [rows] = await db.query(`
      SELECT 
    c.id,
    c.name,
    c.description,

    COUNT(DISTINCT t.id) AS topics_count,
    COUNT(DISTINCT p.id) AS posts_count

FROM categories c

LEFT JOIN categories sc 
    ON sc.parent_id = c.id

LEFT JOIN topics t 
    ON t.category_id = sc.id

LEFT JOIN posts p 
    ON p.topic_id = t.id AND p.is_deleted = 0

WHERE c.parent_id IS NULL

GROUP BY c.id, c.name, c.description
LIMIT ? OFFSET ?;
    `, [limit, offset]);

    return rows;
};

exports.getCategoriesWithStats = async () => {
    const [rows] = await db.query(`
SELECT 
    c.id,
    c.name,
    c.description,

    COUNT(DISTINCT t.id) AS topics_count,
    COUNT(p.id) AS posts_count

FROM categories c

LEFT JOIN topics t 
    ON c.id = t.category_id

LEFT JOIN posts p 
    ON t.id = p.topic_id
    AND p.is_deleted = 0

WHERE c.parent_id IS NULL

GROUP BY c.id, c.name, c.description;
    `);

    return rows;
};

exports.createCategotie = async (cate) => {
    const sql = `
        INSERT INTO categories (name, description, parent_id)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        cate.name,
        cate.description,
        cate.parent_id
    ]);
    return result;
};

exports.updateCategories = async (cat) => {
    const sql = `
        UPDATE categories
        SET name = ?, description = ?, parent_id = ?
        WHERE id = ?
    `;

    await db.query(sql, [
        cat.name,
        cat.description,
        cat.parent_id,
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

exports.getParentsCategories = async () => {
    const [rows] = await db.query(`
        SELECT id, name, description, parent_id
        FROM categories
        WHERE parent_id IS NULL
    `);

    return rows;
};

exports.getSubcategories = async (parentId) => {
    const [rows] = await db.query(`
SELECT 
    c.id,
    c.name,
    c.description,
    parent.name AS parent_name,

    COUNT(DISTINCT t.id) AS topics_count,
    COUNT(p.id) AS posts_count

FROM categories c

LEFT JOIN categories parent 
    ON c.parent_id = parent.id

LEFT JOIN topics t 
    ON t.category_id = c.id

LEFT JOIN posts p 
    ON p.topic_id = t.id
    AND p.is_deleted = 0

WHERE c.parent_id = ?

GROUP BY c.id, c.name, c.description, parent.name;
    `, [parentId]);

    return rows;
};

exports.getAllCategoriesWithStats = async (limit, offset) => {

    const [rows] = await db.query(`
        SELECT
            c.id,
            c.name,
            c.description,
            c.parent_id,
            COUNT(DISTINCT t.id) AS topics_count,
            COUNT(p.id) AS posts_count

        FROM categories c

        LEFT JOIN topics t
            ON c.id = t.category_id

        LEFT JOIN posts p
            ON t.id = p.topic_id
            AND p.is_deleted = 0

        GROUP BY
            c.id,
            c.name,
            c.description

        ORDER BY c.id DESC

        LIMIT ?
        OFFSET ?
    `, [limit, offset]);

    return rows;
};

exports.getName = async (categoryId) => {
    const [rows] = await db.query(`
SELECT *
FROM categories
WHERE id = ?
    `, [categoryId]);

    return rows[0];
};

