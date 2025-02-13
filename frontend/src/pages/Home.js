import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const url = "http://localhost:5000/todos";
function Home() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const x = localStorage.getItem("userName");
  const userName = x !== "" ? x : "Not Available";
  useEffect(() => {
    fetchTodos();
  }, []);
  //to fetch the stored todos from the server.
  const fetchTodos = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:5000/todos/${userId}`);
    setTodos(response.data);
  };
  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const response = await axios.post(url, {
      title: newTodo,
      completed: false,
      userId: localStorage.getItem("userId"),
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

  const handlelogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };
  return (
    <div className="Home">
      <div className="xx">
        <h3 className="username">Username: {userName}</h3>
        <button className="logout-btn" onClick={handlelogout}>Logout</button>
      </div>

      <header className="Home-header">
        <h1>Tasks ToDo </h1>
        <div className="inputBox">
          <input
            className="inputBox"
            type="text"
            placeholder="Enter a task..."
            //newTodo is the object that holds the values and sent to api
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="add" onClick={addTodo}>
            {" "}
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} style={{ listStyle: "none" }}>
              <span
                // style={{
                //   textDecoration: todo.completed ? "line-through" : "none",
                // }}
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.completed ? "✅" : "⭕"} {todo.title}
                {/* {todo.title} */}
              </span>
              <button className="delete" onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
      <center>Copyrights &copy; 2025 - Developed by Malliprasath </center>
    </div>
  );
}

export default Home;
