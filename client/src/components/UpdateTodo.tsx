import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Add-Update.css";

function UpdateTodo() {
  let navigate = useNavigate();
  let location = useLocation();

  let state = location.state;

  const ID = location.pathname.split("/")[2];

  const [todo, setTodo] = useState<object>({
    name: String,
    description: String,
    deadline: String,
  });

  function handleChange(e: any) {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClick(e: any) {
    e.preventDefault();
    try {
      axios.put("http://localhost:8800/todos/" + ID, todo);
      navigate("/todos");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="UpdateTodo">
      <button
        onClick={() => {
          navigate("/todos");
        }}
      >
        back
      </button>
      <div className="form">
        <h2>Update Todo List</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          autoComplete="off"
          value={state.name}
        />
        <label htmlFor="name">Description</label>
        <input
          type="text"
          onChange={handleChange}
          name="description"
          autoComplete="off"
          value={state.description}
        />
        <label htmlFor="name">Deadline</label>
        <input
          type="text"
          onChange={handleChange}
          name="deadline"
          autoComplete="off"
          value={state.deadline}
        />
        <button onClick={handleClick}>Update</button>
      </div>
    </div>
  );
}

export default UpdateTodo;
