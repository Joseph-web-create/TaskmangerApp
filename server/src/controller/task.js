import createHttpError from "http-errors";
import Tasks from "../model/task.js";

export const taskInputs = async (req, res, next) => {
  const { title, description, tags } = req.body;
  const { id: userId } = req.user;

  try {
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
  } catch (error) {
    next(error);
  }
};

export const allTasks = async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    if (!userId) {
      return next(createHttpError(400, "You need to login"));
    }

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

  try {
    if (!userId) {
      return next(createHttpError(400, "Login to edit post"));
    }

    if (!taskId) {
      return next(createHttpError(400, "Task ID is required"));
    }

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

export const deleteTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;

  try {
    if (!taskId) {
      return next(createHttpError(400, "Task id required"));
    }

    if (!userId) {
      return next(createHttpError(400, "Login"));
    }

    const deleteData = await Tasks.findOneAndDelete({ _id: taskId, userId });

    if (!deleteData) {
      return next(createHttpError(404, "Task not found"));
    }
    console.log(deleteData);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deleteData,
    });
  } catch (error) {
    next(error);
  }
};
