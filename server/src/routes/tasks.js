import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { allTasks, taskInputs } from "../controller/task.js";

const router = express();

router.post("/task", verifyToken, taskInputs);
router.get("/allTasks", verifyToken, allTasks);

export default router;
