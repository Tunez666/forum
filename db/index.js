const express = require("express");
const mysql = require("mysql2");
const app = express();

// Настройка подключения
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forum"
});

// Подключение
connection.connect(err => {
  if (err) throw err;
  console.log("MySQL подключена!");
});

app.listen(3000, () => console.log("Сервер запущен"));