import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("User already exists");
        error.statuscode = 400;
        throw error;
    }   
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new User({
        name,
        email,
        password: hashedPassword,
    });
    await data.save();
    return ({success: true, message: "User registered successfully", data });
};


export const login = async ({ email, password }) =>{
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statuscode = 400;
      throw error;
    }
    // comparing the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statuscode = 400;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const data = {
        name: user.name,
        email: user.email,
        roll: user.roll,
    }
 return ({ token, data });   
}