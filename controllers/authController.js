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