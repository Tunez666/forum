const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");

exports.showHome = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    res.render("index", { usersCount, postsCount });

};

exports.showLogin = (req, res) => {
    res.render("login"); // рендерит views/login.ejs
};
exports.showReg = (req, res) => {
    res.render("reg"); // рендерит views/reg.ejs
};
exports.showAdmin = (req, res) => {
    res.render("adminPanel"); 
};