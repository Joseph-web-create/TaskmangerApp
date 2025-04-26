import express from "express";
import { registerUser, loginUser, logOut } from "../controller/user.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("logout", logOut);

export default routes;
