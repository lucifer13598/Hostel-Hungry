import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Function to create the transporter (Brevo SMTP)
const getTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Port 587 uses STARTTLS
    auth: {
      user: process.env.EMAIL, // Your verified Brevo sender email
      pass: process.env.PASS,  // Your Brevo SMTP Key
    },
    connectionTimeout: 10000,
  });
};

/* =======================
   PASSWORD RESET OTP EMAIL
   ======================= */
export const sendOtpMail = async (to, otp) => {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"Hostel Hungry" <${process.env.EMAIL}>`,
      to,
      subject: "Reset Your Password - Hostel Hungry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
          <p>Hello,</p>
          <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
          <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">
            ${otp}
          </div>
          <p>This code is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Hostel Hungry Delivery Service</p>
        </div>
      `
    });

    console.log("Password Reset OTP sent successfully to:", to);
  } catch (error) {
    console.error("Password Reset Email OTP Error:", error.message);
    throw error;
  }
};

/* =======================
   DELIVERY OTP EMAIL
   ======================= */
export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"Hostel Hungry" <${process.env.EMAIL}>`,
      to: user.email,
      subject: "Delivery OTP - Hostel Hungry",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #ff4d2d;">Delivery Confirmation</h2>
          <p>Your OTP for delivery is: <b style="font-size: 20px;">${otp}</b></p>
          <p>Please share this only with the delivery partner once you receive your order.</p>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
        </div>
      `
    });

    console.log("Delivery OTP sent successfully to:", user.email);
  } catch (error) {
    console.error("Delivery Mail Error:", error.message);
    throw error;
  }
};




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
// import nodemailer from "nodemailer";

// // Function to create the transporter (Points to Brevo)
// const getTransporter = () => {
//     return nodemailer.createTransport({
//         host: "smtp-relay.brevo.com",
//         port: 587,
//         secure: false, // Port 587 uses STARTTLS
//         auth: {
//             user: process.env.EMAIL, // Your verified Brevo sender email
//             pass: process.env.PASS,  // Your Brevo SMTP Key (Long string)
//         },
//         connectionTimeout: 10000, 
//     });
// };

// export const sendOtpMail = async (to, otp) => {
//     try {
//         const transporter = getTransporter();

//         await transporter.sendMail({
//             from: `"Hostel Hungry" <${process.env.EMAIL}>`,
//             to: to,
//             subject: "Reset Your Password - Hostel Hungry",
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
//                     <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
//                     <p>Hello,</p>
//                     <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
//                     <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">
//                         ${otp}
//                     </div>
//                     <p>This code is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
//                     <hr style="border: none; border-top: 1px solid #eee;" />
//                     <p style="font-size: 12px; color: #888; text-align: center;">Vingo Food Delivery Service</p>
//                 </div>
//             `
//         });

//         console.log("Password Reset OTP sent successfully to:", to);
//         return true;
//     } catch (error) {
//         console.error("Brevo OTP Error:", error.message);
//         throw new Error("Email service failed");
//     }
// };

// export const sendDeliveryOtpMail = async (user, otp) => {
//     try {
//         const transporter = getTransporter();

//         await transporter.sendMail({
//             from: `"Hostel Hungry" <${process.env.EMAIL}>`,
//             to: user.email,
//             subject: "Delivery OTP - Hostel Hungry",
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//                     <h2 style="color: #ff4d2d;">Delivery Confirmation</h2>
//                     <p>Your OTP for delivery is: <b style="font-size: 20px;">${otp}</b></p>
//                     <p>Please share this only with the delivery partner once you receive your order.</p>
//                 </div>
//             `
//         });
        
//         console.log("Delivery OTP sent successfully to:", user.email);
//     } catch (error) {
//         console.error("Delivery Mail Error:", error.message);
//         throw error;
//     }
// };


