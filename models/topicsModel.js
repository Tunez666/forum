const db = require("../db/index.js");

exports.countTopics = async () => {
    const sql = `
        SELECT COUNT(id) AS countTopics
        FROM topics 
    `;

    const [rows] = await db.query(sql);
    return rows;
};

exports.getLastTopics = async (sort = "new", categoryId = null) => {

    const sortMap = {
        new: "t.created_at DESC",
        popular: "posts_count DESC",
        empty: "posts_count ASC"
    };

    const orderBy = sortMap[sort] || sortMap.new;

    let where = "";
    const params = [];

    if (categoryId) {
        where = "WHERE t.category_id = ?";
        params.push(categoryId);
    }

    const [rows] = await db.query(`
        SELECT 
            t.id,
            t.title,
            t.description,
            t.created_at,

            c.name AS category_name,
            u.username AS author_name,
            u.id AS author_id,
            u.avatarca AS author_avatar,

            COUNT(p.id) AS posts_count

        FROM topics t

        JOIN categories c ON c.id = t.category_id
        JOIN users u ON u.id = t.author_id

        LEFT JOIN posts p 
            ON p.topic_id = t.id 
            AND p.is_deleted = 0

        ${where}

        GROUP BY 
            t.id,
            t.title,
            t.description,
            t.created_at,
            c.name,
            u.username

        ORDER BY ${orderBy}
        LIMIT 10;
    `, params);

    return rows;
};

exports.getTopics = async ({ sort, categoryId, limit, offset }) => {

    const sortMap = {
        new: "t.created_at DESC",
        popular: "posts_count DESC",
        empty: "posts_count ASC"
    };

    const orderBy = sortMap[sort] || sortMap.new;

    let where = "";
    const params = [];

    if (categoryId) {
        where = "WHERE t.category_id = ?";
        params.push(categoryId);
    }

    // 1. данные
    const [topics] = await db.query(`
        SELECT 
            t.id,
            t.title,
            t.description,
            t.created_at,

            c.name AS category_name,
            u.username AS author_name,
            u.id AS author_id,
            u.avatarca AS author_avatar,

            COUNT(p.id) AS posts_count

        FROM topics t

        JOIN categories c ON c.id = t.category_id
        JOIN users u ON u.id = t.author_id

        LEFT JOIN posts p 
            ON p.topic_id = t.id 
            AND p.is_deleted = 0

        ${where}

        GROUP BY t.id

        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
    `, [...params, limit, offset]);

    // 2. общее количество
    const [countRows] = await db.query(`
        SELECT COUNT(*) as total
        FROM topics t
        ${where}
    `, params);

    return {
        topics,
        total: countRows[0].total
    };
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
    t.is_closed,

    u.id AS author_id,
    u.username AS author_name,
    u.avatarca AS author_avatar,

    c.id AS category_id,
    c.name AS category_name,
    c.description AS category_description

FROM topics t

JOIN users u 
    ON u.id = t.author_id

JOIN categories c 
    ON c.id = t.category_id

WHERE t.id = ?
    `;

    const [rows] = await db.query(sql, [topicId]);
    return rows[0];
};

exports.getSubTopics = async (categoryId) => {
    const [rows] = await db.query(`
SELECT 
    t.id,
    t.title,
    t.description,
    t.created_at,

    u.username AS author_name,
    u.id AS author_id,
    u.avatarca AS author_avatar,

    COUNT(p.id) AS posts_count

FROM topics t

JOIN users u 
    ON u.id = t.author_id

LEFT JOIN posts p 
    ON p.topic_id = t.id 
    AND p.is_deleted = 0

WHERE t.category_id = ?

GROUP BY t.id, t.title, t.description, t.created_at, u.username

ORDER BY t.created_at DESC;
    `, [categoryId]);

    return rows;
};

exports.searchTop = async (search) => {
    const [rows] = await db.query(`
        SELECT 
            t.id,
            t.title,
            t.description,
            t.created_at,

            c.name AS category_name,
            u.username AS author_name,
            u.id AS author_id,
            u.avatarca AS author_avatar,

            COUNT(p.id) AS posts_count

        FROM topics t

        JOIN categories c ON c.id = t.category_id
        JOIN users u ON u.id = t.author_id

        LEFT JOIN posts p 
            ON p.topic_id = t.id 
            AND p.is_deleted = 0

        WHERE t.title LIKE ?

        GROUP BY 
            t.id, t.title, t.description, t.created_at,
            c.name, u.username

        ORDER BY t.created_at DESC
    `, [`%${search}%`]);

    return rows;
};

exports.deleteTop = async (topId) => {
    const sql = `
        DELETE FROM topics
        WHERE id = ?
    `;

    await db.query(sql, [topId]);
};

exports.userTopics = async (userId) => {
    const sql = `
        SELECT COUNT(id) AS countTopics
        FROM topics 
        WHERE author_id = ?
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;

};

exports.updateTopic = async (topic) => {

    console.log(topic);

    const sql = `
        UPDATE topics 
        SET title = ?, category_id = ?, description = ?, is_closed = ?
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [
        topic.title,
        topic.category_id,
        topic.description,
        topic.is_closed,
        topic.id
    ]);
    return result;
};

/*exports.closeTopic = async (topic) => {

    console.log(topic);

    const sql = `
        UPDATE topics 
        SET is_closed = 1
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [
        topic.id
    ]);
    return result;
};*/