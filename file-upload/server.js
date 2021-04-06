const fs = require('fs');
const http = require('http');
const path = require('path');
// const nodemon = require('nodemon');

// app = http

const form = fs.readFileSync(path.join(_dirname, "public", "form.html"));
const formidable = require("formidable");
const port = 7808

http.createServer((req, res) => {
    if(req.method === 'GET') {
        get(res);
        return;
    }
    if(req.method === 'POST') {
        post(req, res);
        return
    }
    error(405, res)
})
.listen(port)

function get(res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.end(form);
}

function error(code, err) {
    res.statusCoden = code;
    res.end(http.STATUS_CODES[code]);
}