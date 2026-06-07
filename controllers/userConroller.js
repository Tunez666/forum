const userModel = require("../models/userModel");
const topicsModel = require("../models/topicsModel");
const postsModel = require("../models/postsModel");
const likesModel = require("../models/likesModel");
const notModel = require("../models/notModel");
const bcrypt = require("bcrypt");

exports.showUser = async (req, res) => {
    const userId = req.session.userId;

     const notifications = await notModel.userNotifications(userId);

    const user = await userModel.selectNormalUser(userId);

    const posts = await postsModel.userPosts(userId);
    const postsCount = posts[0].countPosts;

    const topics = await topicsModel.userTopics(userId);
    const topicsCount = topics[0].countTopics;

    const likes = await likesModel.userLikes(userId);
    const likesCount = likes[0].total_likes;

    const postsRaw = await userModel.userPostsByDay(userId);
    const likesRaw = await userModel.userLikesByDay(userId);
    const rep = likesCount + topicsCount + postsCount;
   

    const formatDate = (d) => {
        return new Date(d).toISOString().slice(0, 10);
    };

    const map = {};

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);

        const key = d.toISOString().slice(0, 10);

        map[key] = {
            day: key,
            posts: 0,
            likes: 0
        };
    }

    // заполняем посты
    postsRaw.forEach(r => {
        const key = formatDate(r.date);

        if (map[key]) {
            map[key].posts = r.posts;
        }
    });

    // заполняем лайки
    likesRaw.forEach(r => {
        const key = formatDate(r.date);

        if (map[key]) {
            map[key].likes = r.likes;
        }
    });

    const chartData = Object.values(map);


    console.log("postsRaw", postsRaw);
    console.log("likesRaw", likesRaw);
    console.log("chartData", chartData);
    res.render("user/lk", { userData: user, postsCount, topicsCount, likesCount, rep, chartData, notifications });
};

exports.showPosts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const posts = await postsModel.userPosts(userId);
    const postsCount = posts[0].countPosts;

    const postsData = await postsModel.userAllPosts(userId, limit, offset);

    const totalPages = Math.ceil(postsCount / limit);

        const notifications = await notModel.userNotifications(userId);

    res.render("user/userPosts", { userData: user, postsCount, postsData, totalPages, currentPage: page, notifications });
};

exports.showTopics = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const topics = await topicsModel.userTopics(userId);
    const topicsCount = topics[0].countTopics;

    const topicsData = await topicsModel.selectUserTopics(userId, limit, offset);

    const totalPages = Math.ceil(topicsCount / limit);

    const notifications = await notModel.userNotifications(userId);

    res.render("user/userTopics", { userData: user, topicsCount, topics, topicsData, totalPages, currentPage: page, notifications });
};


exports.showLkUser = async (req, res) => {
    const userId = req.session.userId;
    console.log(req.params);
    const user = await userModel.selectNormalUser(req.params.id);

    const posts = await postsModel.userPosts(req.params.id);
    const postsCount = posts[0].countPosts;

    const topics = await topicsModel.userTopics(req.params.id);
    const topicsCount = topics[0].countTopics;

    const likes = await likesModel.userLikes(req.params.id);
    const likesCount = likes[0].total_likes;

    const rep = likesCount + topicsCount + postsCount;
    const notifications = await notModel.userNotifications(userId);
    res.render("user/prLk", { userData: user, postsCount, topicsCount, likesCount, rep, notifications });
};

exports.updateUserInfo = async (req, res) => {
    const userId = req.session.userId;

    const { username, email, uid, about } = req.body;

     const currentUser = await userModel.selectNormalUser(userId);

    const avatarca = req.file
        ? req.file.filename
        : currentUser.avatarca;

    await userModel.updateUserInfo({
        id: userId,
        username,
        email,
        uid,
        about,
        avatarca
    });

    res.redirect("/user/lk");
};

exports.updatePass = async (req, res) => {
    const { currentPass, newPass, enterPass } = req.body;
    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);
    const match = await bcrypt.compare(currentPass, user.password);

    if (!match) {
        return res.send("Текущий пароль не совпадает");
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

    res.redirect("/user/lk");
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

exports.dropPost = async (req, res) => {
    const { post_id } = req.body;

    await postsModel.delPost({
        id: post_id
    });

    res.redirect(`/user/userPosts`);
};