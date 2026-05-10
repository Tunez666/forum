const userModel = require("../models/userModel");
const topicsModel = require("../models/topicsModel");
const bcrypt = require("bcrypt");

exports.showLogin = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowsss = await topicsModel.countTopics();
    const topicsCount = rowsss[0].countTopics;

    res.render("login", { usersCount, topicsCount });
};
exports.showReg = (req, res) => {
    res.render("reg");
};

exports.register = async (req, res) => {
    const { username, uid, email, password, smart_token } = req.body;

    const { verifyCaptcha } = require("../services/captchaService");

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

    // 1. СНАЧАЛА проверка наличия токена
    if (!smart_token) {
        return res.status(403).render("error", {
            message: "Пройдите капчу"
        });
    }

    // 2. ПОТОМ проверка у Яндекса
    const captchaOk = await verifyCaptcha(smart_token, ip);

    if (!captchaOk) {
        return res.status(403).render("error", {
            message: "Подтвердите, что вы не робот"
        });
    }

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

    const { email, password, smart_token } = req.body;
    const { verifyCaptcha } = require("../services/captchaService");
    const user = await userModel.selectUser(email);
    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

    const captchaOk = await verifyCaptcha(smart_token, ip);
    if (!smart_token) {
        return res.status(403).render("error", {
            message: "Пройдите капчу"
        });
    }
    if (!captchaOk) {
        return res.status(403).render("error", {
            message: "Подтвердите, что вы не робот"
        });
    }
    if (!user) {
        return res.status(404).render("error", {
            message: "Пользователь не найден"
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).render("error", {
            message: "Неверный пароль"
        });
    }

    const isBlocked = await userModel.isUserBlocked(user.id);

    if (isBlocked) {
        return res.status(403).render("error", {
            message: "Аккаунт заблокирован"
        });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.id_r;

    const usersRole = user.id_r;
    console.log("ID:", user.id);
    console.log("ROLE:", user.id_r);

    if (usersRole == 2) {
        return res.redirect("/");
    } else if (usersRole == 1) {
        return res.redirect("/admin/dashboard");
    } else if (usersRole == 3) {
        return res.redirect("/admin/content");
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