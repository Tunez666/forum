const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const { username, uid, email, password } = req.body;

    // Хешируем пароль
    const saltRounds = 10; // уровень сложности
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создаём пользователя с хешированным паролем
    await userModel.createUser({
        username,
        uid: uid || null,
        email,
        password: hashedPassword
    });

    res.redirect("/login");
};

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