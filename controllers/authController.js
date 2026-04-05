const userModel = require("../models/userModel");
const topicsModel = require("../models/topicsModel");
const bcrypt = require("bcrypt");

exports.showLogin = async(req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowsss = await topicsModel.countTopics();
    const topicsCount = rowsss[0].countTopics;

    res.render("login", { usersCount, topicsCount}); 
};
exports.showReg = (req, res) => {
    res.render("reg"); 
};

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

    res.redirect("login");
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

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.id_r;

    const usersRole = user.id_r;
    console.log("ROLE:", user.id_r);

    if (usersRole == 2) {
        return res.redirect("/");
    } else if (usersRole == 1) {
        return res.redirect("/admin/dashboard");
    }

};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("Ошибка при выходе");
        }
        res.redirect("login");
    });
};