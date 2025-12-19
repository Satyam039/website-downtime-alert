import nodemailer from "nodemailer";

console.log("📧 Mailer service loaded (FORCED CONFIG MODE)");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",      
  port: 587,                   
  secure: false,
  auth: {
    user: "satyampandey2219@gmail.com",  
    pass: "ikpjelxnadfdkmxz",      
  },
});

export async function sendAlertEmail({ website, analysis }) {
  const info = await transporter.sendMail({
    from: `"Website Alert System" <satyampandey2219@gmail.com>`,
    to: "satyam.pandey@cloudzent.com",
    subject: `🚨 ALERT: Website Risk – ${website}`,
    text: analysis,
  });

  console.log("✅ Alert email sent:", info.messageId);
}
