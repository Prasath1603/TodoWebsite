import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const url = "http://localhost:5000/todos";
function App() {
  //initialize states to store the todos and update the todo placeholder.
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  //to fetch the stored todos from the server.
  const fetchTodos = async () => {
    const response = await axios.get(url);
    setTodos(response.data);
  };
  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const response = await axios.post(url, {
      title: newTodo,
      completed: false,
    });

    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);

    const response = await axios.put(`http://localhost:5000/todos/${id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === id ? response.data : t)));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo </h1>
        <div className="inputBox">
        <input
          className="inputBox"
          type="text"
          placeholder="Enter a task..."
          //newTodo is the object that holds the values and sent to api
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add" onClick={addTodo}> Add</button></div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} style={{listStyle: "none"}}>
              <span
                // style={{
                //   textDecoration: todo.completed ? "line-through" : "none",
                // }}
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.completed ? "✅" : "⭕"} {todo.title}
                {/* {todo.title} */}
              </span>
              <button className="delete" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
      <center>Copyrights &copy; 2025 - Developed by Malliprasath  </center>
    </div>
    
  );
}

export default App;
