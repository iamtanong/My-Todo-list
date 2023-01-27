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

  const [deadlineType, setDeadlineType] = useState<string>("");

  function radioChange(e: any) {
    setDeadlineType(e.target.value);
    let { deadline, ...rest } = todo;
    setTodo({ ...rest, deadline: "" });
  }

  console.log(state.deadline);
  let k = state.deadline.split("-");
  if (k.length > 2) setDeadlineType("date");
  else if (k[1][0] == "W") setDeadlineType("week");
  else setDeadlineType("month");

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
        <div className="date-type" onChange={radioChange}>
          <label className="radio-group">
            <span className="label">Date</span>
            <input type="radio" name="deadline-type" value="date" />
            <span className="check"></span>
          </label>
          <label className="radio-group">
            <span className="label">Week</span>
            <input type="radio" name="deadline-type" value="week" />
            <span className="check"></span>
          </label>
          <label className="radio-group">
            <span className="label">Month</span>
            <input type="radio" name="deadline-type" value="month" />
            <span className="check"></span>
          </label>
        </div>

        <input
          type={deadlineType}
          placeholder="deadline"
          onChange={handleChange}
          name="deadline"
          autoComplete="off"
        />
        <button onClick={handleClick}>Update</button>
        <span>{hell}</span>
      </div>
    </div>
  );
}

export default UpdateTodo;
