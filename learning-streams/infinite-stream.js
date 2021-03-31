const fs = require("fs");

const pamela = fs.createReadStream("/dev/urandom");
let size = 0;
pamela.on("data", (data) => {
    size += data.length;
    console.log("File size:", size);
});