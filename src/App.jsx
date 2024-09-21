import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValueUpdate, setInputValueUpdate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, checked: false }]);
      setInputValue("");
    }
  };

  const handleUpdateTodo = (index) => {
    if (inputValueUpdate.trim() !== "") {
      setTodos(todos.map((todo, i) => (i === index ? inputValueUpdate : todo)));
      setEditIndex(null);
    }
  };

  const handleCheckboxChange = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <>
      <div className="todo">
        <input
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>

        <h1>Todo List</h1>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={inputValueUpdate}
                    onChange={(e) => setInputValueUpdate(e.target.value)}
                  />
                  <button onClick={() => handleUpdateTodo(index)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {todo.checked ? (
                    <del>{todo.text}</del>
                  ) : (
                    <p
                      onDoubleClick={() => {
                        setEditIndex(index);
                        setInputValueUpdate(todo.text);
                      }}
                    >
                      {todo.text}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      setTodos(todos.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
