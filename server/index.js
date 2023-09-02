const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Store OTPs in-memory for this example; in a production environment, use a database
const otpStore = new Map();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nikhillende9121@gmail.com',
    pass: "gbpnuhnxvulxxjhl", // Replace with your App Password or regular Gmail password
  },
  host: 'smtp.gmail.com',
  port: 465, // Use port 465 for SSL
  secure: true, // Use SSL
});

// Generate and send OTP email


  const fun=async()=>{
   
    
  }

fun();

app.post('/sendmail', async (req, res) => {
 const Email=req.body.Email;
  const otp = otpGenerator.generate(6, { digits: true, specialChars: false, alphabets: false });

  // Store the OTP for later verification (usually, this would be stored in a database)
  otpStore.set("lendenikhil9121@gmail.com", otp);

  // Send OTP email
  const mailOptions = {
    from: 'nikhillende9121@gmail.com', 
    to: Email,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  
  } catch (error) {
    console.error(error);
    
  }
});

// Verify the received OTP
app.post('/verify', (req, res) => {
  const { otp, email } = req.body;

  const storedOTP = otpStore.get(email);

  if (storedOTP && otp === storedOTP) {
    otpStore.delete(email); 
    console.log("verified");
    res.send({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
