import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        message: `User already exists`,
      });
    }
    
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hasedPassword, role });
    await newUser.save();
    return res.status(201).json({
      messgae: `user registered with Name: ${name}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `User is not existed`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: `invalid credentials`,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).json({
      message: `user logged in successfully`,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
