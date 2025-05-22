import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();


app.use(express.json());


app.use("/employees", employeesRouter);


app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});


app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


export default app;


// TODO: this file!
