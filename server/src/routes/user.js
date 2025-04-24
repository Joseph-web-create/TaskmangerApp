import express from "express";
import { registerUser } from "../controller/user.js";

const routes = express.Router();

routes.post("/register", registerUser);

export default routes;
