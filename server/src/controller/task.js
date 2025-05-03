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
    const task = await Tasks.find({ userId }).sort({ createdAt: -1 });
    console.log(task);
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const { title, description, tags } = req.body;
  const { id: userId } = req.user;

  if (!userId) {
    return next(createHttpError(400, "Login to edit post"));
  }

  if (!taskId) {
    return next(createHttpError(400, "Task ID is required"));
  }

  try {
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (tags) updateData.tags = tags;

    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: taskId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(createHttpError(404, "Task not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Task updates", updatedTask });
  } catch (error) {
    next(error);
  }
};
