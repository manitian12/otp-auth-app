const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "12deori23@gmail.com",
        pass: "pbtx dwip oqtd awox", // Or App Password
    },
});

const mailOptions = {
    from: "12deori23@gmail.com",
    to: "12deori23@gmail.com", // Replace with your email for testing
    subject: "Test Email",
    text: "This is a test email from Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});
