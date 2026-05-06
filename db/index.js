const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

// Создаём пул соединений
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Проверим подключение (опционально)
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("MySQL подключена!");
        conn.release();
    } catch (err) {
        console.error("Ошибка подключения к MySQL:", err);
    }
})();

module.exports = pool;