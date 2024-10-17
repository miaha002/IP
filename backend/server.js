const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todoController");

//app config
const app = express();

const port = process.env.PORT || 8000;

const connectionURL = process.env.MONGO_URI;

//Middlewares
//convert to json
app.use(express.json());

app.use(Cors());

//DB config
mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

//API Endpoints

//Get todo list
app.get("/todos", getTodos);

//create todo list
app.post("/todos", createTodo);

//update todo list
app.put("/todos/:id", updateTodo);

//delete todo list
app.delete("/todos/:id", deleteTodo);
