import React, { useRef, useState } from "react";

import service from "./../../../services/todosAxios";

import { NEW_TODO_DEFAULT } from "../../../constants/todos";

// lifting state up

export default function TodosForm({liftingNewTodo}) {
  const inputTitle = useRef();
  const inputStatus = useRef();
  const formRef = useRef();

  const [newTodo, setNewTodo] = useState(NEW_TODO_DEFAULT);

  const handleFormTitle = (e) => {
    setNewTodo((prevState) => ({ ...prevState, title: e.target.value }));
  };

  const handleFormStatus = (e) => {
    setNewTodo((prevState) => {
      return { ...prevState, status: parseInt(e.target.value) };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    liftingNewTodo(newTodo);
  };

  return (
    <div class="form-container">
    <form className="todo__form" onSubmit={handleFormSubmit} ref={formRef}>
      <label class='title'>
        Title{" "}
        <input
          type="text"
          ref={inputTitle}
          defaultValue={newTodo.title}
          onChange={handleFormTitle}
        />
      </label>
      <label class='status'>
        Status{" "}
        <select id="status" ref={inputStatus} onChange={handleFormStatus} >
                    <option value="0">To Do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Done</option>
                </select>
      </label>
      <button>Add todo</button>
    </form>
    </div>
  );
}