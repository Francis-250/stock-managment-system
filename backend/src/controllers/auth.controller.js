import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateOTP } from "../utils/otp.js";
import transporter from "../utils/mailer.js";
import cloudinary from "../utils/cloudinary.js";

export async function register(req, res) {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !firstName || !password) {
    return res.status(400).json({
      message: "Email, first name and password are required",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    const expire = new Date(Date.now() + 10 * 60 * 1000);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sms-upload",
    });
    const avatar = cloudinary.url(result.public_id, {
      // width: 150,
      // height: 150,
      // crop: "thumb",
    });
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        avatar,
      },
    });
    const otps = await prisma.otp.create({
      data: {
        code: otp,
        userId: newUser.id,
        expiresAt: expire,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Verify your email",
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser, otps });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"  ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function verifyEmail(req, res) {
  const { email, otp } = req.body;
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function ActivateAccount(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function DisableAccount(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function ResetPassword(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function ChangePassword(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
