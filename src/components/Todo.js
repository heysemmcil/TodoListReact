import React, { useState } from "react";

const Todo = (props) => {
  const { todo, todos, setTodos } = props;
  const date = new Date(todo.createdAt);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleDelete = () => {
    const temporarySet = todos.filter((item) => item.id !== todo.id);
    setTodos(temporarySet);
    localStorage.setItem("todos",JSON.stringify(temporarySet))
  };

  const handleDoneBtn = () => {
    const newTodo = {
      ...todo,
      isDone: !todo.isDone,
    };
    const droppedSet = todos.filter((item) => item.id !== todo.id);
    const newSet = [...droppedSet, newTodo];
    setTodos(newSet);
    localStorage.setItem("todos",JSON.stringify(newSet))

  };

  const handleEdit = () => {
     const newTodo = {
        ...todo,
        text: updatedText
     }
     const droppedSet = todos.filter((item) => item.id !== todo.id);
      setTodos([...droppedSet, newTodo])
     setIsEdit(false);
     localStorage.setItem("todos",JSON.stringify(todos))
  }

  return (
    <div
      className={`rounded d-flex align-items-center justify-content-between alert alert-${
        todo.isDone === false ? "secondary" : "success"
      } `}
    >
      <div>
        {
            isEdit === false ? (
                <h1
                  className={`${
                    todo.isDone === true ? "text-decoration-line-through" : ""
                  }`}
                >
                  {todo.text}
                </h1>) : (
                    <div className="d-flex">
                        <input value={updatedText} 
                        onChange={(event) => setUpdatedText(event.target.value)}
                        />
                        <button onClick={handleEdit} className="btn btn-sm btn-success">
                            Save
                        </button>
                    </div>

                )
        }
        <small>{date.toLocaleString()}</small>
      </div>

      {/* BUTTON SIDE BELOW */}
      <div>
        <button
          onClick={handleDoneBtn}
          type="button"
          className="btn btn-sm btn-success"
        >
          {todo.isDone === false ? "Done" : "UnDone"}
        </button>

        <button
          onClick={() => {
            setIsEdit(!isEdit)
            if (isEdit === true){
                setUpdatedText(todo.text)
            }
        }}
          type="button"
          className="btn btn-sm btn-secondary"
        >
          {isEdit === false ? "Edit" : "Cancel "}
        </button>

        <button
          onClick={handleDelete}
          type="button"
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
