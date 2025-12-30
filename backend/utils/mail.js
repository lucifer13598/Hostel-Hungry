// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// export const sendOtpMail=async (to,otp) => {
//     await transporter.sendMail({
//         from:process.env.EMAIL,
//         to,
//         subject:"Reset Your Password",
//         html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     })
// }


// export const sendDeliveryOtpMail=async (user,otp) => {
//     await transporter.sendMail({
//         from:process.env.EMAIL,
//         to:user.email,
//         subject:"Delivery OTP",
//         html:`<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     })
// }
import nodemailer from "nodemailer";

export const sendOtpMail = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS, // 16-character code with NO SPACES
            },
            // Add a timeout to prevent the 502 Gateway crash
            connectionTimeout: 10000, 
        });

        await transporter.sendMail({
            from: `"Hostel Hungry" <${process.env.EMAIL}>`,
            to: to,
            subject: "Reset Your Password - Hostel Hungry",
            html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`
        });
        
        return true;
    } catch (error) {
        console.error("Nodemailer Error:", error.message);
        // Throwing the error allows your controller to catch it and send a 500 
        // instead of letting the whole server crash (502)
        throw new Error("Email service failed");
    }
};
export const sendDeliveryOtpMail = async (user, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: `"Hostel Hungry" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Delivery OTP - Hostel Hungry",
            html: `<p>Your OTP for delivery is <b>${otp}</b>. Please share this with the delivery partner.</p>`
        });
    } catch (error) {
        console.error("Delivery Mail Error:", error.message);
        throw error;
    }
};
