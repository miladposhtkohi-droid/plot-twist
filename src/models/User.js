import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll : {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //TODO: Add salt and hash password
  // password: 34097uoewihjrgf90384tujfvfe0rpåtu3409tjoirgfj
 // 123456 => 123456+secretkey => hash(123456+secretkey) => 34097uoewihjrgf90384tujfvfe0rpåtu3409tjoirgfj
  next();
});

const User = mongoose.model("User", userSchema);

export default User;