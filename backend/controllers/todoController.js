const mongoose = require("mongoose");
const Todos = require("../dbTodos");

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({
  endpoint: "http://localhost:4566",
  region: "eu-west-2",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

// get todo list
const getTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find({}).sort({ createdAt: -1 });
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// create a new todo item
const createTodo = async (req, res) => {
  const dbTodo = req.body;
  console.log(dbTodo);
  try {
    const newTodo = await Todos.create(dbTodo);
    res.status(201).send(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// update a todo item
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    //checks id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No item found for ID, ${id}");
    }
    const todoID = { _id: id };
    const update = { completed: true };

    const updateTodo = await Todos.findOneAndUpdate(todoID, update);
    if (!updateTodo) {
      return res.status(404).send("No item found for ID, ${id}");
    }
    res.status(200).send(updateTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete a todo item
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    //checks id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No item found for ID, ${id}");
    }

    const deleteTodo = await Todos.findOneAndDelete({ _id: id });
    if (!deleteTodo) {
      return res.status(404).send("No item found for ID, ${id}");
    }
    res.status(200).send(deleteTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
