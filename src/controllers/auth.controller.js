import * as authServeces from "../services/auth.services.js";

// skappa konto
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authServeces.register({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    return res.status(error.statuscode || 500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
    .status(400)
    .json({ message: "Password must be at least 6 characters long" });
  }
  
  try {
    const user = await authServeces.login({ email, password });
    res.status(200).json({ success: true, ...user });
    
  } catch (error) {
    console.log(error)
    return res.status(error.statuscode || 500).json({ message: error.message });
  }
};
