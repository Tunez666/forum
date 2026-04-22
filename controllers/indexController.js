const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");
const categoriesModel = require("../models/categoriesModel");
const eventsModel = require("../models/eventsModel");

exports.showHome = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await settingsModel.selectSettings();
    console.log(rowsss);

    const userId = req.session.userId;

    const user = await userModel.selectNormalUser(userId);

    res.render("index", { usersCount, postsCount, settings: rowsss[0], userData: user });

};

exports.showForum = async (req, res) => {
    const userId = req.session.userId;
    const rows = await topicsModel.countTopics();
    const topicsCount = rows[0].countTopics;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await userModel.countUser();
    const usersCount = rowsss[0].countUsers;

    const rowssss = await categoriesModel.getParentsCategories();

    const topicsCat = await categoriesModel.countTopicsByCategory(1);
    const postsCat = await categoriesModel.countPostsByCategory(1);

    const lastTopics = await topicsModel.getLastTopics();

    const user = await userModel.selectNormalUser(userId);

    const topUsers = await postsModel.topPosts();

    const eventsRaw = await eventsModel.getLastEvents();
    const events = eventsRaw.map(e => {
        const date = new Date(e.datee);

        return {
            ...e,
            day: date.getDate(),
            month: date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '')
        };
    });

    res.render("forum", { topicsCount, postsCount, usersCount, categories: rowssss, topicsCat, postsCat, selectTopics: lastTopics, userData: user, top: topUsers, events });

};

exports.showTop = async (req, res) => {

    res.render("topics");

};

//modals
exports.createTopic = async (req, res) => {
    const { title, description, category_id } = req.body;
    console.log(req.body);
    const userIs = req.session.userId;
    await topicsModel.createTopic({
        title: title,
        category_id: category_id,
        author_id: userIs,
        description: description
    });

    res.redirect("topics");
};