const userModel = require("../models/userModel");
const postsModel = require("../models/postsModel");
const topicsModel = require("../models/topicsModel");
const settingsModel = require("../models/settingsModel");
const eventsModel = require("../models/eventsModel");

exports.showAdmin = async (req, res) => {

    const rows = await userModel.countUser();
    const usersCount = rows[0].countUsers;

    const rowss = await postsModel.countPosts();
    const postsCount = rowss[0].countPosts;

    const rowsss = await topicsModel.countTopics();
    const topicsCount = rowsss[0].countTopics;

    const rowssss = await userModel.getLastUsers(); 

    const rowsssss = await eventsModel.getLastEvents(); 

    res.render("admin/dashboard", { usersCount, postsCount, topicsCount, users: rowssss, events: rowsssss }); 
};

exports.showContent = async(req, res) => {

    const rowsss = await settingsModel.selectSettings(); 

    const eventsRaw = await eventsModel.getLastEvents(); 

    const events = eventsRaw.map(e => {
        const date = new Date(e.datee);

        return {
            ...e,
            day: date.getDate(),
            month: date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '')
        };
    }); 

    res.render("admin/content", {settings: rowsss[0], events }); 
};

exports.showCategories = (req, res) => {
    res.render("admin/categories"); 
};

exports.showTopics = (req, res) => {
    res.render("admin/topics"); 
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

exports.updateCharacter = async (req, res) => {
    console.log(req.file); // файл
    console.log(req.body); // обычные поля

    const filename = req.file.filename;

    await settingsModel.updateCharacter({
        patch: filename
    });

    res.redirect("/admin/content");
};

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