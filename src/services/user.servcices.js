import User from "../models/User.js";


export const getMe = async (userId) => {
    const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statuscode = 404;
    throw error;
  }
  return { user };
}
export const getAllUsers = async () => {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
        const error = new Error("No users found");
        error.statuscode = 404;
        throw error;
    }
    return { users };
}



export const updateMe = async (userId, { name, email }) => {
    const user = await User.findByIdAndUpdate(
      userId,
        { name, email },
        { new: true },
    ).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statuscode = 404;
        throw error;
    }
    return { user };
}

export const deleteMe = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statuscode = 404;
        throw error;
    }
    return { message: "User deleted" };
}



