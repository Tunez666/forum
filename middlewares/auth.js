
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
            return res.status(403).render("errors/403");
        }
    },
    isUser: (req, res, next) => {
        if (req.session.role === 2) {
            next(); // юзер
        } else {
            return res.status(403).render("errors/403");
        }
    }
};