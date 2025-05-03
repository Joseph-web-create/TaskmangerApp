import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  allTasks,
  deleteTask,
  editTask,
  taskInputs,
} from "../controller/task.js";

const router = express();

router.post("/task", verifyToken, taskInputs);
router.get("/allTasks", verifyToken, allTasks);
router.patch("/updateTask/:id", verifyToken, editTask);
router.delete("/deleteTask/:id", verifyToken, deleteTask);

export default router;
