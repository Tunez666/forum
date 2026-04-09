const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");

exports.showAdmin = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await topicsModel.countTopics();
    const topicsCount = rowsss[0].countTopics;

    const rowssss = await userModel.getLastUsers(); 

    res.render("admin/dashboard", { usersCount, postsCount, topicsCount, users: rowssss }); 
};

exports.showContent = async(req, res) => {

    const rowsss = await settingsModel.selectSettings(); 
    res.render("admin/content", {settings: rowsss[0] }); 
};

exports.updateVersion = async (req, res) => {
    const { version } = req.body;
    console.log(req.body);
    const userIs = req.session.userId;
    await settingsModel.updateVersion({
        version,
        id_u: userIs
    });

    res.redirect("/admin/content");
};