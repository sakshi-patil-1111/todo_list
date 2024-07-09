import { useState, useEffect } from "react";
import "./App.css";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("allTodos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    const updatedTodos = [...allTodos, { task: newTask, completed: false }];
    setTodos(updatedTodos);
    setNewTask("");
    localStorage.setItem("allTodos", JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem("allTodos", JSON.stringify(updatedTodos));
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...allTodos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("allTodos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task</label>
            <input
              type="text"
              placeholder="enter task"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            ></input>
          </div>
          <div className="todo-input-item">
            <button className="primaryBtn" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className="secondaryBtn">To-Do</button>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                {item.completed ? (
                  <FaRegCheckSquare
                    className="check-icon"
                    onClick={() => toggleTodoCompletion(index)}
                  />
                ) : (
                  <FaRegSquare
                    className="check-icon"
                    onClick={() => toggleTodoCompletion(index)}
                  />
                )}
                <p
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </p>
                <MdDeleteForever
                  className="icon"
                  onClick={() => handleDeleteTodo(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
