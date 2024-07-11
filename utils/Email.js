const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user:process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            connectionTimeout: 60000,
            greetingTimeout: 30000, 
            socketTimeout: 60000, 
        });

        await transporter.sendMail({
            from:process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;