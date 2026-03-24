exports.showHome = (req, res) => {
    res.render("index"); // рендерит views/index.ejs
};
exports.showLogin = (req, res) => {
    res.render("login"); // рендерит views/login.ejs
};
exports.showReg = (req, res) => {
    res.render("reg"); // рендерит views/reg.ejs
};
