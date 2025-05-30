import express, { json } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./src/routes/user.js";
import cors from "cors";
import tasksRoute from "./src/routes/tasks.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  opttionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credential: true,
};

app.use(cors(corsOptions));
app.use(json({ limit: "25mb" }));
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/api/auth", userRoutes);
app.use("/api/taskApi", tasksRoute);

app.use((req, res, next) => {
  return next(createHttpError(404, `Page not found ${req.originalUrl}`));
});

app.use((error, req, res, next) => {
  console.log(error);

  let message = "Internal server error";

  let statusCode = 500;

  if (isHttpError(error)) {
    message = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ error: message });
});

export default app;
