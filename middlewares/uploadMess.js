const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "img", "uploadsPosts"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + '-' + file.fieldname + ext;
        cb(null, name);
    }
});

const uploadMulter = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Для множественных файлов (2 изображения)
const uploadMultiple = uploadMulter.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
]);

// Для одного файла (старый функционал)
const uploadSingle = uploadMulter.single("ava");

module.exports = {
    uploadMultiple,
    uploadSingle
};