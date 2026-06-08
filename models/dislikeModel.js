const db = require("../db/index.js");

exports.toggleDislike = async (userId, postId) => {

    const [rows] = await db.query(
        "SELECT * FROM dislikes WHERE user_id = ? AND post_id = ?",
        [userId, postId]
    );

    if (rows.length > 0) {

        await db.query(
            "DELETE FROM dislikes WHERE user_id = ? AND post_id = ?",
            [userId, postId]
        );

        return { disliked: false };

    } else {

        await db.query(
            "INSERT INTO dislikes (user_id, post_id) VALUES (?, ?)",
            [userId, postId]
        );

        const [postRows] = await db.query(
            "SELECT author_id FROM posts WHERE id = ?",
            [postId]
        );

        const authorId = postRows[0].author_id;

        if (authorId !== userId) {
            await db.query(`
        INSERT INTO notifications
        (user_id, sender_id, type, post_id)
        VALUES (?, ?, ?, ?)
    `, [authorId, userId, 'dislike', postId]);
        }

        return { disliked: true };
    }
};