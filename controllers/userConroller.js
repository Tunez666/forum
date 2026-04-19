const userModel = require("../models/userModel");

exports.showUser = async (req, res) => {
    const userId = req.session.userId;

    const user = await userModel.selectNormalUser(userId);

    res.render("user/lk", { userData: user });
};

exports.updateUserInfo = async (req, res) => {
    const userId = req.session.userId;

    const { username, uid, about } = req.body;

    const avatarca = req.file ? req.file.filename : null;

    await userModel.updateUserInfo({
        id: userId,
        username,
        uid,
        about,
        avatarca
    });

    res.redirect("/user/lk");
};

/*exports.updateAva = async (req, res) => {
    const userId = req.session.userId;
    const filename = req.file.filename;

    await userModel.updateAva({
        patch: filename,
        id: userId
    });

    res.redirect("/user/lk");
};*/
