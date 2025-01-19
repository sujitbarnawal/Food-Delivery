import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import transporter from "../config/nodemailer.js";

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //creating user by hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    //jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token });

    //sending mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL_ID,
      to: email,
      subject: "New Registration to MithoMitho",
      text: `Welcome to MithoMitho,${name}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (mailError) {
      console.error("Error sending email:", mailError.message);
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//send pass reset otp
const sendPassResetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() * 10 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL_ID,
      to: user.email,
      subject: "Reset Password Otp",
      text: `Your reset password otp is ${otp} and expires in 10 minutes `,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (mailError) {
      console.error("Error sending email:", mailError.message);
    }
    res.json({ success: true, message: "Otp sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//reset pass
const resetPass = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email) return res.json({ success: false, message: "Email is required" });
  if (!otp) return res.json({ success: false, message: "Otp is required" });
  if (!newPassword)
    return res.json({ success: false, message: "New password is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.resetOtp || Number(user.resetOtp) !== Number(otp)) {
      return res.json({ success: false, message: "Invalid otp" });
    }

    if (new Date(user.resetOtpExpireAt).getTime() < Date.now()) {
      return res.json({ success: false, message: "Otp has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = 0;
    user.resetOtpExpireAt = 0;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL_ID,
      to: user.email,
      subject: "Password Reset Successful",
      text: `Your password has been reset successfully`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Error sending email:", mailError.message);
    }

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPass:", error.message);
    return res.json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, sendPassResetOtp, resetPass };
