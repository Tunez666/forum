const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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

exports.updatePass = async (req, res) => {
    const { currentPass, newPass, enterPass } = req.body;
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const match = await bcrypt.compare(currentPass, user.password);

         if (!match) {
        return res.send("Текущий пароль не совпадает");
    }
        if (newPass !== enterPass){
            return res.send("Пароли не совпадают");
        }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(newPass, saltRounds);

    await userModel.updatePass({
        password: hashedPassword,
        id:userId
    });

    res.redirect("/user/lk");
};
exports.deleteUserModal = async (req, res) => {
    const userId = req.session.userId;
    await userModel.deleteUser({
        id:userId
});
req.session.destroy(err => {
        if (err) {
            return res.send("Ошибка при выходе");
        }
        res.redirect("/");
    });

};