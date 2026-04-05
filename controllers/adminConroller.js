const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
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

exports.showContent = (req, res) => {
    res.render("admin/content"); 
};