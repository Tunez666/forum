const express = require("express");
const path = require("path"); 
const session = require("express-session");

const db = require("./db/index.js");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");



const app = express();

// шаблонизатор
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// статика
app.use(express.static(path.join(__dirname, "public")));
//даннфе форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// сессии
app.use(session({
    secret: "supersecretkey",  // секретная фраза для подписи куки
    resave: false,              // не сохранять, если сессия не изменена
    saveUninitialized: false,   // не сохранять пустые сессии
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 день
}));

app.use((req, res, next) => {
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role
    } : null;

    next();
});

// роуты
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);



app.listen(8080, () => {
    console.log("Server started http://localhost:8080");
});