const express = require("express");
const path = require("path"); 
const db = require("./db/index.js");
const indexRoutes = require("./routes/index");

const app = express();

// Шаблонизатор
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// папка со статикой
app.use(express.static(path.join(__dirname, "public")));

// подключаем маршруты
app.use("/", indexRoutes);


app.listen(3000, () => {
    console.log("Server started http://localhost:3000");
});