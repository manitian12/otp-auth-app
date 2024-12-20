const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

let userOtp = {};

app.post("/send-otp", (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).send("Email is required!");

    const otp = crypto.randomInt(100000, 999999).toString();
    userOtp[email] = otp;

    // Send OTP via Email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "12deori23@gmail.com", // Replace with your email
            pass: "pbtx dwip oqtd awox", // Replace with your password or app-specific password
        },
    });

    const mailOptions = {
        from: "12deori23@gmail.com",
        to: email,
        subject: "pbtx dwip oqtd awox",
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send("Failed to send OTP");

        res.status(200).send("OTP sent successfully!");
    });
});

app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (userOtp[email] === otp) {
        delete userOtp[email]; // Clear OTP after successful verification
        return res.status(200).send("Account created successfully");
    }

    res.status(400).send("Invalid OTP");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
