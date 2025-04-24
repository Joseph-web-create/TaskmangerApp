import app from "./app.js";
import connectToDb from "./src/config/database.js";

const port = 4000;

connectToDb()
  .then(() => {
    serverStart();
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

const serverStart = () => {
  app.listen(port, () => {
    console.log(`server started at port ${port}`);
  });
};
