const db = require("../db/index.js");
exports.countPosts = async () => {
    const sql = `
        SELECT COUNT(id) AS countPosts
        FROM posts 
    `;

    const [rows] = await db.query(sql);
    return rows;
};

exports.topPosts = async () => {
    const sql = `
        SELECT 
    u.id,
    u.username,
    COUNT(p.id) AS posts_count
FROM users u

JOIN posts p 
    ON u.id = p.author_id
    AND p.is_deleted = 0

GROUP BY u.id, u.username

ORDER BY posts_count DESC

LIMIT 5;
    `;

    const [rows] = await db.query(sql);
    return rows;
};


exports.getPosts = async (topicId, userId) => {
    const sql = `
        SELECT 
            p.id,
            p.content,
            p.created_at,
            p.updated_at,
            p.author_id,
            p.patch,
            u.username,
            u.avatarca,

            COUNT(l.id) AS likes_count,
            COUNT(dl.id) AS dislikes_count,

             parent.id AS parent_id,
             parent.content AS parent_content,

             parent_user.username AS parent_username,

            MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS is_liked,
            MAX(CASE WHEN dl.user_id = ? THEN 1 ELSE 0 END) AS is_disliked

        FROM posts p

        JOIN users u ON u.id = p.author_id
        LEFT JOIN likes l ON l.post_id = p.id
        LEFT JOIN dislikes dl ON dl.post_id = p.id
        LEFT JOIN posts parent
        ON p.parent_post_id = parent.id
        LEFT JOIN users parent_user
        ON parent.author_id = parent_user.id

        WHERE p.topic_id = ?
        AND p.is_deleted = 0

        GROUP BY p.id

        ORDER BY p.created_at ASC;
    `;

    const [rows] = await db.query(sql, [userId || 0, userId || 0, topicId]);

    return rows;
};

exports.createPost = async (post) => {

    const sql = `
        INSERT INTO posts (topic_id, author_id, parent_post_id, content, patch)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        post.topic_id,
        post.author_id,
        post.parent_post_id,
        post.content,
        post.patch
    ]);


    const [topicRows] = await db.query(`
        SELECT author_id
        FROM topics
        WHERE id = ?
    `, [post.topic_id]);

    if (topicRows.length > 0) {

        const topicAuthorId = topicRows[0].author_id;

        // не уведомляем самого себя
        if (topicAuthorId !== post.author_id) {

            await db.query(`
                INSERT INTO notifications
                (user_id, sender_id, type, post_id)
                VALUES (?, ?, ?, ?)
            `, [
                topicAuthorId,
                post.author_id,
                'reply',
                result.insertId
            ]);
        }
    }

    return result;
};

exports.deletePost = async (postId) => {
    const sql = `
        DELETE FROM posts
        WHERE id = ?
    `;

    await db.query(sql, [postId]);
};


exports.grafPosts = async () => {
    const sql = `
        SELECT DATE(created_at) as date, COUNT(*) as posts
FROM posts
WHERE created_at >= NOW() - INTERVAL 7 DAY
GROUP BY DATE(created_at)
ORDER BY date;
    `;
    const [rows] = await db.query(sql);
    return rows;

};

exports.userPosts = async (userId) => {
    const sql = `
        SELECT COUNT(id) AS countPosts
        FROM posts 
        WHERE author_id = ?
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;

};

exports.updatePost = async (post) => {

    console.log(post);

    const sql = `
        UPDATE posts
        SET content = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [
        post.content,
        post.id
    ]);
    return result;
};

exports.delPost = async (post) => {

    console.log(post);

    const sql = `
        DELETE FROM posts
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [
        post.id
    ]);
    return result;
};

exports.userAllPosts = async (userId, limit, offset) => {
    const sql = `
SELECT 
    posts.id AS post_id,
    posts.content,
    posts.created_at,
    posts.updated_at,

    users.id AS author_id,
    users.username,
    users.avatarca,

    topics.id AS topic_id,
    topics.title AS topic_title,
    topics.description AS topic_description,

    categories.id AS category_id,
    categories.name AS category_name

FROM posts
JOIN users ON users.id = posts.author_id
JOIN topics ON topics.id = posts.topic_id
JOIN categories ON categories.id = topics.category_id

WHERE posts.author_id = ?
ORDER BY posts.created_at DESC
 LIMIT ? OFFSET ?;
    `;

    const [rows] = await db.query(sql, [userId, limit, offset]);
    return rows;

};


