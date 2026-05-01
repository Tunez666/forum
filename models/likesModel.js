const db = require("../db/index.js");

exports.toggleLike = async (userId, postId) => {
   
    const [rows] = await db.query(
        "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
        [userId, postId]
    );

    if (rows.length > 0) {
       
        await db.query(
            "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
            [userId, postId]
        );
        return { liked: false };
    } else {
       
        await db.query(
            "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
            [userId, postId]
        );
        return { liked: true };
    }

    
};