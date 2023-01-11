import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Add-Update.css";

function UpdateTodo() {
  let navigate = useNavigate();
  let location = useLocation();

  let state = location.state;

  const ID = location.pathname.split("/")[2];

  interface td {
    name: String;
    description: String;
    deadline: String;
    important: any;
  }

  const [todo, setTodo] = useState<td>({
    name: "",
    description: "",
    deadline: "",
    important: 0,
  });

  function handleChange(e: any) {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [hell, setHell] = useState<string>("");

  function handleClick(e: any) {
    e.preventDefault();

    if (todo.name === "" || todo.description === "" || todo.deadline === "") {
      setHell("Cannot Update todo with Empty value.");
    } else
      try {
        setHell("");
        axios.put("http://localhost:8800/todos/" + ID, todo);
        navigate("/todos");
      } catch (err) {
        setHell("Something error. Please check Console.");
        console.log(err);
      }
  }

  return (
    <div className="UpdateTodo">
      <button
        onClick={() => {
          navigate("/");
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
        <span>{hell}</span>
      </div>
    </div>
  );
}

export default UpdateTodo;
