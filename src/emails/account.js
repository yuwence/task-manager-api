const sgMail = require("@sendgrid/mail")
const { application } = require("express")

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "a739925201@gmail.com",
        subject: "Thanks for joining in!",
        text: `Wellcom to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "a739925201@gmail.com",
        subject: "Sorry to see you go!",
        text: `Goodbye, ${name}. `
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}