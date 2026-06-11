const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const userModel = require("../models/userModel");


exports.createBackup = (req, res) => {
  const date = new Date().toISOString().replace(/[:.]/g, "-");

  const fileName = `backup-${date}.sql`;
  const filePath = path.join(__dirname, "../backups", fileName);

  const mysqldumpPath = "C:\\xampp\\mysql\\bin\\mysqldump.exe"; 

  const user = process.env.DB_USER || "root";
  const db = process.env.DB_NAME || "forum";

  const command = `"${mysqldumpPath}" -u ${user} ${db} --result-file="${filePath}"`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("Backup error:", err);
      console.error("stderr:", stderr);
      return res.status(500).send("Ошибка создания бэкапа");
    }

    res.redirect("/admin/backups");
  });
};

exports.getBackups = async (req, res) => {

    const userId = req.session.userId;
    const user = await userModel.selectNormalUser(userId);

    const dir = path.join(__dirname, "../backups");

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const files = fs.readdirSync(dir).map(file => {

        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        return {
            id: file,
            filename: file,
            size: (stats.size / 1024).toFixed(2) + " KB",
            createdAt: stats.birthtime
        };

    });

    // сортировка по дате (новые сверху)
    files.sort((a, b) => b.createdAt - a.createdAt);

    const totalBackups = files.length;

    const backupsPages =
        Math.ceil(totalBackups / limit);

    const offset =
        (page - 1) * limit;

    const backups =
        files.slice(offset, offset + limit);

    res.render("admin/backups", {
        backups,
        userData: user,

        page,
        backupsPages
    });

};

exports.downloadBackup = (req, res) => {
    
    const file = req.params.id;
    const filePath = path.join(__dirname, "../backups", file);

    res.download(filePath);
};

exports.restoreBackup = (req, res) => {

    const file = req.params.id;
    const filePath = path.join(__dirname, "../backups", file);

    const mysqlPath = "C:\\xampp\\mysql\\bin\\mysql.exe";

    const command = `"${mysqlPath}" -u root forum < "${filePath}"`;

    require("child_process").exec(command, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Ошибка восстановления");
        }

        res.redirect("/admin/backups");
    });
};

exports.deleteBackup = (req, res) => {
    const file = req.params.id;
    const filePath = path.join(__dirname, "../backups", file);

    fs.unlinkSync(filePath);

    res.redirect("/admin/backups");
};