const http = require('http');

process.env.HOSTNAME;
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    if (req.method !== "GET") return error(res, 405);
    if (req.url === "/techAcademy") return techAcademy(res);
    error(res, 404);
});

    function error(res, code) {
        res.statusCode = code;
        res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
    }

    function techAcademy(res) {
        res.end(`<h1>Welcome to Tech Academy </h1>`);
    }

    server.listen(PORT, process.env.HOSTNAME, () => {
        console.log(`We have agreed to resume by 7am`, PORT);
    });