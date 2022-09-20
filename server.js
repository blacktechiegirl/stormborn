const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("unhandledException", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Exception..... Shutting down !!!!");
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: "./.env" });
const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"));

const server = app.listen(5000, () => {
  console.log("App is running on port 5000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled promise rejection.... Shutting down !!!!");
  server.close(() => {
    process.exit(1);
  });
});
