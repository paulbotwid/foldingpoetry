const nodemailer = require("nodemailer")

const sendEmail = async (subject, message, send_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "465",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    const options = {
        from: process.env.EMAIL_USER,
        to: send_to,
        subject: subject,
        html: message
    }

    // send email
    transporter.sendMail(options, function(err, info){
        if(err) {
            console.log("error in sendMail function")
            console.log(err)
        } else {
            console.log("Success in sendMail function")
            console.log(info)
        }
    })
}

module.exports = sendEmail