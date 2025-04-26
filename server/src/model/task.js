import { Schema, model } from "mongoose";

const tasksSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requred: [true, "User id is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Task Description is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Tasks = model("Tasks", tasksSchema);

export default Tasks;
