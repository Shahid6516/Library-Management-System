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
      messgae: `user registered with Name: ${name}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findone({ email });
    if (!user) {
      res.status(400).json({
        message: `User is not existed`,
      });

      const isMatch = await bcrypt.compare(password, user.passsword);
      if (!isMatch) {
        res.status(404).json({
          message: `invalid credentials`,
        });
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({
      message: `user logged in successfully`,
      token,
    });
    
  } catch (error) {
    console.log(error);
  }
};
