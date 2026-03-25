const express = require("express");
const path = require("path"); 
const session = require("express-session");

const db = require("./db/index.js");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/log");


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

// роуты
app.use("/", indexRoutes);
app.use("/api", authRoutes);
app.use("/api", logRoutes);


app.listen(8080, () => {
    console.log("Server started http://localhost:8080");
});