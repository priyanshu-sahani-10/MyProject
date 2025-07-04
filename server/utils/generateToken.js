import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (res, user, message) => {
  console.log("checking user role", user.role);
  console.log("checking user id", user._id);
  const token = jwt.sign({ userId: user._id , role:user.role}, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};
