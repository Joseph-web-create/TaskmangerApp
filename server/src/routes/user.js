import express from "express";
import {
  registerUser,
  loginUser,
  logOut,
  autheticateUser,
} from "../controller/user.js";
import verifyToken from "../middleware/verifyToken.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/logout", logOut);
routes.get("/user", verifyToken, autheticateUser);

export default routes;
