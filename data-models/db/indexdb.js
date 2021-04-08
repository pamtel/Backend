const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }, () => console.log("connected"));

    const db = mongoose.connection;

    module.exports = db;