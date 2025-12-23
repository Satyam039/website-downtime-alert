import nodemailer from "nodemailer";

console.log("📧 Mailer service loaded (FORCED CONFIG MODE)");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",      
  port: 587,                   
  secure: false,
  auth: {
    user: "test@gmail.com",  
    pass: "xyz",      
  },
});

export async function sendAlertEmail({ website, analysis }) {
  const info = await transporter.sendMail({
    from: `"Website Alert System" <test@gmail.com>`,
    to: "xyz@cloudzent.com",
    subject: `🚨 ALERT: Website Risk – ${website}`,
    text: analysis,
  });

  console.log(" Alert email sent:", info.messageId);
}
