const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendWelcomeEmail = async (toEmail, userName) => {

    console.log('sendWelcomeEmail called with:', { toEmail, userName });
    if (!toEmail || !userName) {
        console.error('Invalid email or username:', { toEmail, userName });
        throw new Error('Email and username are required');
    }

    try {
        // Verify connection configuration
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        const mailOptions = {
            from: process.env.MAIL, // Sender address
            to: toEmail, // List of recipients
            subject: 'Welcome to Workout Pal!', // Subject line
        
            text: `Hello ${userName}, Welcome to Workout Pal! We're excited to have you on board!`, // Plain text body
            html: `<img src='https://i.ibb.co/HprqYB5/workout-Pal.png' width='200px' height='50px'></img>
            <p>Hello <strong>${userName}</strong>,</p><p>Welcome to Workout Pal! We're excited to have you on board!</p>`, // HTML body
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:')

        return result;
        
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

const testEmailService = async () => {
    try {
        // Use your actual email for testing
        await sendWelcomeEmail(process.env.MAIL, 'TestUser');
        console.log('Test email completed');
    } catch (error) {
        console.error('Test email failed:', error);
    }
};

module.exports = { sendWelcomeEmail, testEmailService };