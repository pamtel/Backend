const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://precious:precious@cluster0.tsolq.mongodb.net/test",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }, () => console.log("connected"));

    const db = mongoose.connection;

    module.exports = db;