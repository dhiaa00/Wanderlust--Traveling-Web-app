import nodemailer from "nodemailer";

const sendVerificationCode = async (email, verificationCode) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "azdhia4242@gmail.com",
      pass: "kkdq fach mmcn ggcp",
    },
  });

  let info = await transporter.sendMail({
    from: '"Wanderlust" test@email.com', // sender address
    to: email, // receiver's email
    subject: "Email Verification", // Subject line
    text: `Your verification code is ${verificationCode}`, // plain text body
  });

  return info;
};

export default sendVerificationCode;
