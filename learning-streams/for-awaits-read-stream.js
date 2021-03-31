const fs = require("fs");
const pamela = fs.createReadStream("./file.txt");
async function run() {
    for await (const chunk of pamela) {
        console.log("Read chunk:", chunk);
    }
    console.log("No more data.");
}
run();