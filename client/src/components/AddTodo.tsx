import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add-Update.css";
import { GiRoundStar } from "react-icons/gi";

function AddTodo() {
  let navigate = useNavigate();
  const [isStar, setIsStar] = useState<boolean>(false);

  const [todo, setTodo] = useState<object>({
    name: String,
    description: String,
    deadline: String,
    important: Number,
  });

  let fillColor: string = isStar ? "gold" : "balck";

  function handleChange(e: any) {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      important: isStar,
    }));
  }

  function handleClick(e: any) {
    e.preventDefault();
    try {
      axios.post("http://localhost:8800/todos", todo);
      navigate("/todos");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  function StarClick() {
    setIsStar(!isStar);
  }

  return (
    <div className="AddTodo">
      <button
        onClick={() => {
          navigate("/todos");
        }}
      >
        back
      </button>
      <div className="form">
        <h2>Add Todo List</h2>
        <div className="name">
          <input
            type="text"
            placeholder="name"
            onChange={handleChange}
            name="name"
            autoComplete="off"
          />
          <button onClick={StarClick}>
            <GiRoundStar fill={fillColor} />
          </button>
        </div>
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="deadline"
          onChange={handleChange}
          name="deadline"
          autoComplete="off"
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
}

export default AddTodo;
