const fs = require("fs");

const pamela = fs.createReadStream("./file.txt");
pamela.on("data", (data) => {
    console.log("Read chunk:", data.toString());
})

pamela.on("end", () => {
    console.log("No more data.");
})