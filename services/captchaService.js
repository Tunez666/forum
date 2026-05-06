const https = require("https");
const querystring = require("querystring");

const SMARTCAPTCHA_SERVER_KEY = process.env.SMARTCAPTCHA_SERVER_KEY;
// или просто вставь строкой для теста

function verifyCaptcha(token, ip) {
    return new Promise((resolve) => {
        const options = {
            hostname: "smartcaptcha.yandexcloud.net",
            port: 443,
            path: "/validate?" + querystring.stringify({
                secret: SMARTCAPTCHA_SERVER_KEY,
                token: token,
                ip: ip
            }),
            method: "GET",
        };

        const req = https.request(options, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    if (res.statusCode !== 200) {
                        console.log("Captcha error:", data);
                        return resolve(false);
                    }

                    const result = JSON.parse(data);
                    return resolve(result.status === "ok");
                } catch (e) {
                    return resolve(false);
                }
            });
        });

        req.on("error", (err) => {
            console.log("Captcha request error:", err);
            resolve(false);
        });

        req.end();
    });
}

module.exports = { verifyCaptcha };