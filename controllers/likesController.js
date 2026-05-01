const likesModel = require("../models/likesModel");

exports.toggleLike = async (req, res) => {
    console.log("LIKE REQUEST:", req.body, req.session.userId);

    const userId = req.session.userId;
    const { postId } = req.body;

    if (!userId) {
        return res.status(401).json({
            error: "NOT_AUTH",
            redirect: "/login"
        });
    }

    const result = await likesModel.toggleLike(userId, postId);

    res.json(result);
};