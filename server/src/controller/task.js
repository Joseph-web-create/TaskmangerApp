import createHttpError from "http-errors";
import Tasks from "../model/task.js";

export const taskInputs = async (req, res, next) => {
  const { title, description, tags } = req.body;
  const { id: userId } = req.user;

  if (!userId) {
    return next(createHttpError(400, "Login"));
  }

  const task = await Tasks.create({
    userId: userId,
    title,
    description,
    tags,
  });

  res.status(201).json({ success: true, message: "Post created", task });
};

export const allTasks = async (req, res, next) => {
  const { id: userId } = req.user;

  if (!userId) {
    return next(createHttpError(400, "You need to login"));
  }

  try {
    const task = await Tasks.find({ userId });
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};
