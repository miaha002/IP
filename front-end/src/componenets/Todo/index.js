import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Container } from "./styles";
import Form from "../Form";
import TodoList from "../TodoList";

// Main component for the todo app
function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  console.log(input, "input");

  //fetch data on component mount and on input change
  const fetchData = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(todos, "todos");

  //fetch data on the first render
  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    await axios.post("/todos", [
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);
    fetchData();
    setInput("");
    console.log("addedtodo");
  };
  console.log("addtodo");

  return (
    <Container>
      <h2>TODO List</h2>
      <Form input={input} setInput={setInput} addTodo={addTodo} />
      <TodoList todos={todos} fetchData={fetchData} />
    </Container>
  );
}

export default Todo;
