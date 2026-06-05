const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");
const eventsModel = require("../models/eventsModel");
const categoriesModel = require("../models/categoriesModel");
const reportsModel = require("../models/reportsModel");
const bcrypt = require("bcrypt");

exports.showAdmin = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await topicsModel.countTopics();
    const topicsCount = rowsss[0].countTopics;

    const rowssss = await userModel.getLastUsers();

    const rowsssss = await eventsModel.getLastEvents();

    const reports = await reportsModel.getFourReports();

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const posts = await postsModel.grafPosts();
    const users = await userModel.grafReg();

    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    // создаём базу за 7 дней
    const result = days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));

        const dateStr = date.toISOString().slice(0, 10);

        const postDay = posts.find(
            p => new Date(p.date).toISOString().slice(0, 10) === dateStr
        );

        const userDay = users.find(
            u => new Date(u.date).toISOString().slice(0, 10) === dateStr
        );

        return {
            day,
            posts: postDay ? postDay.posts : 0,
            users: userDay ? userDay.users : 0
        };
    });
    console.log(result);
    console.log(posts);
    console.log(users);
    res.render("admin/dashboard", { usersCount, postsCount, topicsCount, users: rowssss, events: rowsssss, reports, chartData: result, userData: user });
};

exports.showContent = async (req, res) => {

    const rowsss = await settingsModel.selectSettings();

    const eventsRaw = await eventsModel.getLastEvents();

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const events = eventsRaw.map(e => {
        const date = new Date(e.datee);

        return {
            ...e,
            day: date.getDate(),
            month: date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '')
        };
    });

    res.render("admin/content", { settings: rowsss[0], events, userData: user });
};

exports.showCategories = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const rows = await categoriesModel.countCategories();
    const categoriesCount = rows[0].countCategories;

    const rowss = await topicsModel.countTopics();
    const topicsCount = rowss[0].countTopics;

    const rowsss = await userModel.countModerators();
    const moderCount = rowsss[0].countModerators;

    // Для карточек с пагинацией
    const categories =
        await categoriesModel.getAllCategoriesWithStats(
            limit,
            offset
        );

    // Для select в модалках
    const allCategories =
        await categoriesModel.getCategories();

    const userId = req.session.userId;
    const user =
        await userModel.selectNormalUser(userId);

    res.render("admin/categories", {
        categoriesCount,
        topicsCount,
        moderCount,

        categories,
        allCategories,

        page,
        pages: Math.ceil(categoriesCount / limit),

        userData: user
    });
};

exports.showSett = async (req, res) => {

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    res.render("admin/settings", { userData: user });
};

exports.showRep = async (req, res) => {

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const limit = 5;

    const postPage = Number(req.query.postPage) || 1;
    const topicPage = Number(req.query.topicPage) || 1;

    const postOffset = (postPage - 1) * limit;
    const topicOffset = (topicPage - 1) * limit;

    const activeTab = req.query.tab || "posts";

    const postRep = await reportsModel.getPostReports(
        limit,
        postOffset
    );

    const topicRep = await reportsModel.getTopReports(
        limit,
        topicOffset
    );

    const totalPostReports =
        await reportsModel.countPostReports();

    const totalTopicReports =
        await reportsModel.countTopicReports();

    res.render("admin/reports", {
        userData: user,

        postRep,
        topicRep,

        postPage,
        topicPage,

        postPages: Math.ceil(totalPostReports / limit),
        topicPages: Math.ceil(totalTopicReports / limit),
        activeTab
    });
};

exports.showUsers = async (req, res) => {

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const limit = 10;

    const usersPage = Number(req.query.usersPage) || 1;
    const bannedPage = Number(req.query.bannedPage) || 1;

    const usersOffset = (usersPage - 1) * limit;
    const bannedOffset = (bannedPage - 1) * limit;

    const users = await userModel.getAllUsers(
        limit,
        usersOffset
    );

    const bannedUsers = await userModel.getBlocked(
        limit,
        bannedOffset
    );

    const totalUsers =
        await userModel.countUsers();

    const totalBanned =
        await userModel.countBlocked();

    res.render("admin/users", {
        userData: user,

        users,
        bannedUsers,

        usersPage,
        bannedPage,

        usersPages: Math.ceil(totalUsers / limit),
        bannedPages: Math.ceil(totalBanned / limit)
    });
};


/*exports.showTopics = async (req, res) => {
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
     
         const { topics, total } = await topicsModel.getTopics({
             sort,
             categoryId,
             limit,
             offset,
             topicId
         });
     
         const totalPages = Math.ceil(total / limit);
     
         res.render("admin/topics", {
             categories,
             subTopics: topics,
             userData: user,
             sort,
             categoryId,
             page,
             totalPages,
             reports,
             name
         });

};*/

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

exports.updateCharacter = async (req, res) => {
    console.log(req.file); // файл
    console.log(req.body); // обычные поля

    const filename = req.file.filename;

    await settingsModel.updateCharacter({
        patch: filename
    });

    res.redirect("/admin/content");
};

exports.updateUserInfo = async (req, res) => {
    const userId = req.session.userId;
    const { username, uid, about } = req.body;

    console.log("=== DEBUG ===");
    console.log("req.file:", req.file);           // что пришло от multer
    console.log("session userId:", userId);

    const currentUser = await userModel.selectNormalUser(userId);

    const avatarca = req.file
        ? req.file.filename
        : currentUser.avatarca;

    await userModel.updateUserInfo({
        id: userId,
        username,
        uid,
        about,
        avatarca
    });

    res.redirect("/admin/settings");
};

exports.updatePass = async (req, res) => {
    const { currentPass, newPass, enterPass } = req.body;
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const match = await bcrypt.compare(currentPass, user.password);

    if (!match) {
        return res.send("Текущий пароль неверный");
    }
    if (newPass !== enterPass) {
        return res.send("Пароли не совпадают");
    }
    if (newPass.length < 8) {
        return res.send("Пароль должен содержать минимум 8 символов");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPass, saltRounds);

    await userModel.updatePass({
        password: hashedPassword,
        id: userId
    });

    res.redirect("/admin/settings");
};
exports.deleteUserModal = async (req, res) => {
    const userId = req.session.userId;
    await userModel.deleteUser({
        id: userId
    });
    req.session.destroy(err => {
        if (err) {
            return res.send("Ошибка при выходе");
        }
        res.redirect("/");
    });

};

exports.deletePosts = async (req, res) => {
    const { post_id } = req.body;

    console.log("DELETE:", post_id);

    await postsModel.deletePost(post_id);

    res.redirect("/admin/reports");
};

exports.deleteTop = async (req, res) => {
    const { top_id } = req.body;

    console.log("DELETE:", top_id);

    await topicsModel.deleteTop(top_id);

    res.redirect("/admin/reports");
};

exports.blockUser = async (req, res) => {
    const { author_id, reason, post_id } = req.body;
    const userId = req.session.userId;

    console.log("block:", author_id);
    console.log("data:", req.body);

    await userModel.blockUser({
        user_id: author_id,
        blocked_by_id: userId,
        reason: reason
    });

    await postsModel.deletePost(post_id);

    res.redirect("/admin/reports");
};

exports.blockUserByTop = async (req, res) => {
    const { author_id, reason, top_id } = req.body;
    const userId = req.session.userId;

    console.log("block:", author_id);
    console.log("data:", req.body);

    await userModel.blockUser({
        user_id: author_id,
        blocked_by_id: userId,
        reason: reason
    });

    await topicsModel.deleteTop(top_id);

    res.redirect("/admin/reports");
};

exports.allGood = async (req, res) => {
    const { rep_id } = req.body;
    console.log(req.body);

    await reportsModel.deleteRep(rep_id);

    res.redirect("/admin/reports");
};

exports.createModerator = async (req, res) => {
    console.log(req.body);

    const { user_id } = req.body;
    await userModel.createModer({
        id: user_id

    });

    res.redirect("/admin/users");
};

exports.createAdm = async (req, res) => {
    console.log(req.body);

    const { user_id } = req.body;
    await userModel.createAdmin({
        id: user_id

    });

    res.redirect("/admin/users");
};


exports.withoutRules = async (req, res) => {
    console.log(req.body);

    const { user_id } = req.body;
    await userModel.withoutRules({
        id: user_id

    });

    res.redirect("/admin/users");
};

exports.block = async (req, res) => {
    const { user_id } = req.body;
    const userId = req.session.userId;
    const reason = "бан от админа / модера";
    await userModel.block({
        user_id: user_id,
        blocked_by_id: userId,
        reason: reason
    });


    res.redirect("/admin/users");
};

exports.unblock = async (req, res) => {
    const { user_id } = req.body;
    const userId = req.session.userId;
    await userModel.unblock({
        user_id: user_id
    });


    res.redirect("/admin/users");
};

// !!!!!!!!!!!!!!МОДАЛКИ!!!!!!!!!!!!!!!!!!!
exports.addEvent = async (req, res) => {
    const { event_name, event_description, event_date, id_u } = req.body;
    console.log(req.body);
    const userIs = req.session.userId;
    await eventsModel.createEvent({
        name: event_name,
        description: event_description,
        datee: event_date,
        id_u: userIs
    });

    res.redirect("/admin/content");
};

exports.updateEvent = async (req, res) => {
    console.log(req.body);

    const { event_name, event_description, event_date, id_u, event_id } = req.body;
    const userIs = req.session.userId;
    await eventsModel.updateEvent({
        id: event_id,
        name: event_name,
        description: event_description,
        datee: event_date,
        id_u: userIs

    });

    res.redirect("/admin/content");
};

exports.DeleteEvent = async (req, res) => {
    const { event_id } = req.body;

    await eventsModel.DeleteEvent(event_id);

    res.redirect("/admin/content");
};

exports.addCate = async (req, res) => {
    const { name, description, parent_id } = req.body;
    console.log(req.body);
    await categoriesModel.createCategotie({
        name: name,
        description: description,
        parent_id: parent_id || null
    });

    res.redirect("/admin/categories");
};

exports.updateCate = async (req, res) => {
    console.log(req.body);

    const { name, description, id, parent_id } = req.body;
    await categoriesModel.updateCategories({
        id,
        name: name,
        description: description,
        parent_id: parent_id || null

    });

    res.redirect("/admin/categories");
};

exports.deleteCat = async (req, res) => {
    const { id } = req.body;

    await categoriesModel.deleteCat(id);

    res.redirect("/admin/categories");
};

