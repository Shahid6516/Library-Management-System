import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (name || email) {
      console.log("user already exist");
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hasedPassword, role });
    await newUser.save();
    res.status(201).json({
      messgae:`user registered with Name: ${name}`
    })
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
