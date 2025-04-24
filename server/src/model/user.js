import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [5, "Password must be 5 characters long"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    profilePictureId: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [150, "Bio cannot be more than 150 characters"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
