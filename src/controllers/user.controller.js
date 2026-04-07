
import * as userServices from "../services/user.servcices.js";

export const getMe = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
  const user = await userServices.getMe(userId);
  res.status(200).json({success: true, message: "User fetched successfully", ...user });

} catch (error) {
  res.status(500).json({ message: "Error fetching user" });
}

};

export const updateMe = async (req, res) => {
  //
  const { name, email } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await userServices.updateMe(userId, { name, email });
    res.status(200).json({ success: true, message: "User updated successfully", ...user }); 
  } catch (error) {
    res.status(500).json({ message: "Error updating user" }); 
  }
};

export const deleteMe = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await userServices.deleteMe(userId);
    res.status(200).json({ success: true, ...user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};


// get all users (admin only)
// @todo
export const getAllUsers = async (req, res) => {
  try {
  const { users } = await userServices.getAllUsers();
  res.status(200).json({success: true, message: "Users fetched successfully", users });

} catch (error) {
  res.status(500).json({ message: "Error fetching user" });
}
};

// get user by id (admin only)
export const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
  const user = await userServices.getMe(userId);
  res.status(200).json({success: true, message: "User fetched successfully", ...user });

} catch (error) {
  res.status(500).json({ message: "Error fetching user" });
}
};


// update user by id (admin only)
export const updateUserById = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await userServices.updateMe(userId, { name, email });
    res.status(200).json({ success: true, message: "User updated successfully", ...user }); 
  } catch (error) {
    res.status(500).json({ message: "Error updating user" }); 
  }
};
// delete user by id (admin only)
export const deleteuserById = async (req, res) => 
{
  const userId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await userServices.deleteMe(userId);
    res.status(200).json({ success: true, ...user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};