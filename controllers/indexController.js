const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const settingsModel = require("../models/settingsModel");

exports.showHome = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await settingsModel.selectSettings(); 
        console.log(rowsss);
        
    res.render("index", { usersCount, postsCount, settings: rowsss[0] });

};

