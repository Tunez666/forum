const dislikeModel = require("../models/dislikeModel");

exports.toggleDislike = async (req, res) => {
    console.log("DISLIKE REQUEST:", req.body, req.session.userId);

    const userId = req.session.userId;
    const { postId } = req.body;

    if (!userId) {
        return res.status(401).json({
            error: "NOT_AUTH",
            redirect: "/login"
        });
    }

    const result = await dislikeModel.toggleDislike(userId, postId);

    res.json(result);
};