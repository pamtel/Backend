const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport ({
    host: "172.20.10.3",
    post: 23
})

transporter.sendMail(
    {
        from: "pamelaahiante@yahoo.com",
        to: "pamelaakosahiante@gmail.com",
        subject: "Washer Woman",
        text: "please help me was all my clothes and make meals"
    },
    (err, info) => {
        if(err){
            console.log(err);;
        }
        console.log("Message sent successfully", info);
    }
)