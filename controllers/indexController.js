const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");
const categoriesModel = require("../models/categoriesModel");
const eventsModel = require("../models/eventsModel");
const reportsModel = require("../models/reportsModel");
const contactModel = require("../models/contactModel");
const notModel = require("../models/notModel");

exports.showHome = async (req, res) => {
    const sort = req.query.sort || "new";

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await settingsModel.selectSettings();
    console.log(rowsss);

    const userId = req.session.userId;

    const user = await userModel.selectNormalUser(userId);

    const categories = await categoriesModel.getCategoriesWithStats();

    const lastTopics = await topicsModel.getLastTopics(sort);

    const topUsers = await postsModel.topPosts();

    const notifications = await notModel.userNotifications(userId);

    const eventsRaw = await eventsModel.getLastEvents();
    const events = eventsRaw.map(e => {
        const date = new Date(e.datee);

        return {
            ...e,
            day: date.getDate(),
            month: date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '')
        };
    });

    res.render("index", { usersCount, postsCount, settings: rowsss[0], userData: user, categories, lastTopics, top: topUsers, events, sort, notifications });

};

exports.showRules = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);

    res.render('rules', {
        userData: user,
        notifications
    });
};

exports.showPolitic = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
     const notifications = await notModel.userNotifications(userId);

    res.render('privacy', {
        userData: user,
        notifications
    });
};

exports.showTop = async (req, res) => {
    const userId = req.session.userId;
    const topicId = req.params.id;

    const sort = req.query.sort || "new";
    const categoryId = req.query.category || null;

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const categories = await categoriesModel.getParentsCategories();
    const user = await userModel.selectNormalUser(userId);
    const reports = await reportsModel.getReportReasons();
    const notifications = await notModel.userNotifications(userId);

    const { topics, total } = await topicsModel.getTopics({
        sort,
        categoryId,
        limit,
        offset,
        topicId
    });

    const totalPages = Math.ceil(total / limit);

    res.render("topics", {
        categories,
        selectTopics: topics,
        userData: user,
        sort,
        categoryId,
        page,
        totalPages,
        reports,
        notifications
    });
};


exports.showPosts = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);

    const topicId = req.params.id;
    const posts = await postsModel.getPosts(topicId, userId);

    const error = req.query.error;

    const topic = await topicsModel.selectTopic(topicId);

    const reports = await reportsModel.getReportReasons();

    const categories = await categoriesModel.getParentsCategories();

    res.render("posts", { userData: user, posts, topicId, error, topic, reports, userId, categories, notifications });

};

exports.showDagTopics = async (req, res) => {

    const userId = req.session.userId;
    const categoryId = req.params.id;
    const topicId = req.params.id;
    const sort = req.query.sort || "new";


    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const categories = await categoriesModel.getParentsCategories();
    const user = await userModel.selectNormalUser(userId);
    const reports = await reportsModel.getReportReasons();
    const name = await categoriesModel.getName(categoryId);
    const notifications = await notModel.userNotifications(userId);

    const { topics, total } = await topicsModel.getTopics({
        sort,
        categoryId,
        limit,
        offset,
        topicId
    });

    const totalPages = Math.ceil(total / limit);

    res.render("dagTopics", {
        categories,
        subTopics: topics,
        userData: user,
        sort,
        categoryId,
        page,
        totalPages,
        reports,
        name,
        notifications
    });
};

exports.showCategories = async (req, res) => {
        const userId = req.session.userId;
    const rows = await categoriesModel.countCategories();
    const categoriesCount = rows[0].countCategories;

    const rowss = await topicsModel.countTopics();
    const topicsCount = rowss[0].countTopics;

    const rowsss = await userModel.countModerators();
    const moderCount = rowsss[0].countModerators;

    const rowssss = await categoriesModel.getCategories();

    const categories = await categoriesModel.getAllCategoriesWithStats();
    const notifications = await notModel.userNotifications(userId);
    const user = await userModel.selectNormalUser(userId);

    res.render("cat", { categoriesCount, topicsCount, moderCount, categories, userData: user, notifications });
};

//create mess
exports.createMess = async (req, res) => {
    const { content, parent_post_id } = req.body;
    const patch = req.file ? req.file.filename : null;
    console.log(req.body);
    const userId = req.session.userId;
    const topicId = req.params.id;

    if (!content || !content.trim()) {
        return res.redirect(`/topic/${topicId}?error=empty`);
    }

    await postsModel.createPost({
        topic_id: topicId,
        author_id: userId,
        parent_post_id: parent_post_id || null,
        content: content,
        patch: patch

    });

    res.redirect(`/topic/${topicId}#last`);
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

exports.createReport = async (req, res) => {
    const { report_id, post_id } = req.body;
    console.log(req.body);
    const userIs = req.session.userId;
    const topicId = req.params.id;
    const stat = 'pending';
    await reportsModel.createReport({
        post_id: post_id,
        user_id: userIs,
        status: stat,
        reason_id: report_id
    });

    res.redirect(`/topic/${topicId}`);
};

exports.createTopRep = async (req, res) => {
    const { report_id, top_id } = req.body;
    console.log(req.body);
    const userIs = req.session.userId;
    const topicId = req.params.id;
    const stat = 'pending';
    await reportsModel.createReport({
        topic_id: top_id,
        user_id: userIs,
        status: stat,
        reason_id: report_id
    });

    res.redirect(`/topics`);
};

exports.editPost = async (req, res) => {
    const { post_id, content } = req.body;
    const topicId = req.params.id;

    await postsModel.updatePost({
        id: post_id,
        content: content
    });

    res.redirect(`/topic/${topicId}`);
};

exports.delPost = async (req, res) => {
    const { post_id } = req.body;
    const topicId = req.params.id;

    await postsModel.delPost({
        id: post_id
    });

    res.redirect(`/topic/${topicId}`);
};

exports.editTopic = async (req, res) => {
    const { title, description, category_id, is_closed } = req.body;
    const topicId = req.params.id;

    await topicsModel.updateTopic({
        id: topicId,
        title: title,
        description: description,
        category_id: category_id,
        is_closed: is_closed
    });

    res.redirect(`/topic/${topicId}`);
};

/*exports.closeTopic = async (req, res) => {
    const { topic_id } = req.body;
    const topicId = req.params.id;

    await topicsModel.closeTopic({
        id: topic_id
    });

    res.redirect(`/topic/${topicId}`);
};*/



////////////////////////////////////////////////////////////////
///////////FOOTER
exports.showContact = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);

    res.render('contact', {
        userData: user,
        notifications
    });
};

exports.contactSend = async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body);
    const stat = 'pending';
    await contactModel.createContact({
        name: name,
        email: email,
        theme: subject,
        message: message,
        status: stat
    });

    res.redirect(`/`);
};

exports.showfaq = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);
    res.render('faq', {
        userData: user,
        notifications
    });
};

exports.showTerms = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);

    res.render('terms', {
        userData: user,
        notifications
    });
};

exports.showAbout = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const notifications = await notModel.userNotifications(userId);

    res.render('about', {
        userData: user,
        notifications
    });
};