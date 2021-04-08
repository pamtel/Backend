const SMTPserver = require("smtp-server").SMTPServer

const port = 23;

const server = new SMTPserver({
    disabledCommands: ["STARTTLS", "AUTH"],
    logger: true,
})

server.on("error", (err) => {
    console.error(err)
})

server.listen(port)