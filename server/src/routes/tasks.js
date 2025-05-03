import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { allTasks, editTask, taskInputs } from "../controller/task.js";

const router = express();

router.post("/task", verifyToken, taskInputs);
router.get("/allTasks", verifyToken, allTasks);
router.patch("/updateTask:id", verifyToken, editTask);

export default router;
