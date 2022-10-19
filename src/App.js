import React, { useState, useEffect } from "react";
import Todo from "./components/Todo"

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("todos");
    if (fromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(fromLocalStorage))
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todoText === "") {
      alert("TodoText Can't be Empty");
      return;
    }

    const todo = {
      id: new Date().getTime(),
      text: todoText,
      isDone: false,
      createdAt: new Date(),
    };

    setTodos([...todos, todo]);
    localStorage.setItem("todos",JSON.stringify([...todos,todo]))
    setTodoText("");
  };

  return (
    <div className="container p-5">
      <h1 className="text-center my-4">MY TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your todos..."
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Button
          </button>
        </div>
      </form>
      <div>
        {todos.length !== 0 ? (
          <div>
            {todos.map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        ) : (
          <h5 className="text-center ">You don't have any todos yet :S</h5>
        )}
      </div>
    </div>
  );
}

export default App;
