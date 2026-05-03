const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");
const categoriesModel = require("../models/categoriesModel");
const eventsModel = require("../models/eventsModel");


//SearchTopic
exports.showSearch = async (req, res) => {
    const userId = req.session.userId;
    const search = req.query.search || "";
    const sort = req.query.sort || "new";

    const categories = await categoriesModel.getParentsCategories();
    const user = await userModel.selectNormalUser(userId);

    const topics = await topicsModel.searchTop(search);

    res.render("searchResults", {
        categories,
        selectTopics: topics,
        userData: user,
        sort,
        search
    });
};