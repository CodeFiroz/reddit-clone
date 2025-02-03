import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // App password (not your Gmail password)
    },
  });


export const sendResetEmail = (resetToken, email)=>{
   try{
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>The link expires in 1 hour.</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) return res.status(500).json({ message: "Email not sent" });
        res.json({ message: "Reset email sent" });
      });

   }catch(error){
        console.warn(`Error while sending rest mail :: ${error}`);
        
   }
}

