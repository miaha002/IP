import React from "react";
import { FormContainer, Input, Button } from "./styles";

// Functional component for the form to add new todos

function Form({ input, setInput, addTodo }) {
  return (
    <FormContainer>
      <Input
        value={input}
        // handles input change
        onChange={(e) => setInput(e.target.value)}
        type="text"
        roles="input"
      />
      <Button type="submit" onClick={(e) => addTodo(e)}>
        Add
      </Button>
    </FormContainer>
  );
}

export default Form;
