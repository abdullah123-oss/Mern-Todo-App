import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h2>MERN Todo App</h2>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter a todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


// Trigger CI/CD pipeline test
