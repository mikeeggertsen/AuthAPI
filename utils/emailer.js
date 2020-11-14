const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendConfirmation = (email, _id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id },
            process.env.JWT_KEY,
            { expiresIn: 600 },
            ((error, token) => {
                if (error) reject("Something went wrong... Try again later or contact us");
                const request = {
                    email, 
                    token
                }
                sendEmail(request, "confirm")
                    .then((msg) => {
                        resolve(msg);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                
            })
        );
    });
}

const sendReset = (email, _id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id },
            process.env.JWT_KEY,
            { expiresIn: 600 },
            ((error, token) => {
                if (error) reject("Something went wrong... Try again later or contact us");
                const request = {
                    email,
                    token
                }
                sendEmail(request, "reset")
                    .then((msg) => {
                        resolve(msg);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
        )
    });
}

const sendEmail = (request, type) => {
    let transporter =  nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        },
    });

    let resetPassword = {
        from: '"WeAuth" <m.eggertsen@hotmail.com>', 
        to: request.email,
        subject: "Reset Passord",
        text:
            `Hi, somebody (Hopefully you) have requested to reset their password on WeAuth. 
            You can reset your password by clicking the following: http://localhost:8080/reset/${request.token}"
            You have 10 minutes before it become invalid and have to receive anoter email. 
            If you didn't request this, just ignore it.`,
    };

    let confirmEmail = {
        from: '"WeAuth" <m.eggertsen@hotmail.com>',
        to: request.email,
        subject: "Email verification", 
        text:
            `Hi! Thank you for creating an account, before we can let you lose on our website, 
            you need to click the following link: http://localhost:8080/confirm/${request.token}`,
    };

    return new Promise((resolve, reject) => {
        switch (type) {
            case "reset":
                transporter.sendMail(resetPassword, (err, info) => {
                    if (err) reject("Something went wrong... Try again later or contact us");
                    else resolve(`Email has been sent to ${request.email}`)
                });
                break;
            case "confirm":
                transporter.sendMail(confirmEmail, (err, info) => {
                    if (err) {
                        console.log(err);
                        reject("Something went wrong... Try again later or contact us");
                    }
                    else {
                        resolve(`Email has been sent to ${request.email}`)
                    }
                })
                break;
        }
    })
}

module.exports = {
    sendConfirmation,
    sendReset
}