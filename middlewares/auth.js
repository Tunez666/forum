
module.exports = {
    isAuth: (req, res, next) => {
        if (req.session.userId) {
            next(); // пользователь есть, идём дальше
        } else {
            res.redirect("/login"); // нет сессии → редирект на логин
        }
    },
    isAdmin: (req, res, next) => {
        if (req.session.role === 1) {
            next(); // админ
        } else {
            res.send("Нет доступа");
        }
    }
};