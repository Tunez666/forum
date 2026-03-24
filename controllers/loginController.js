const userModel = require("../models/userSelectModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.selectUser(email);

    if (!user) {
        return res.send("Пользователь не найден");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.send("Неверный пароль");
    }

    //req.session.userId = user.id;
   // req.session.username = user.username;

    res.redirect("/");
};