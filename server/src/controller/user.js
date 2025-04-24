import createHttpError from "http-errors";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateAcessToken.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return next(createHttpError(400, "All fields required"));
    }

    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (existingUsername) {
      return next(createHttpError(400, "Username already exists"));
    }

    if (existingEmail) {
      return next(createHttpError(400, "Email already exists"));
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const accessToken = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
