import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add-Update.css";
import { GiRoundStar } from "react-icons/gi";

function AddTodo() {
  let navigate = useNavigate();
  const [isStar, setIsStar] = useState<boolean>(false);

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

  let fillColor: string = isStar ? "gold" : "balck";

  function handleChange(e: any) {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      important: isStar,
    }));
  }

  const [hell, setHell] = useState<string>("");

  function handleClick(e: any) {
    e.preventDefault();

    if (todo.name === "" || todo.description === "" || todo.deadline === "") {
      setHell("Cannot Add todo with Empty value.");
    } else {
      try {
        setHell("");
        axios.post("http://localhost:8800/todos", todo);
        navigate("/");
        window.location.reload();
      } catch (err) {
        setHell("Something error. Please check Console.");
        console.log(err);
      }
    }
  }

  function StarClick() {
    setIsStar(!isStar);
  }

  return (
    <div className="AddTodo">
      <button
        onClick={() => {
          navigate("/");
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
        <span>{hell}</span>
      </div>
    </div>
  );
}

export default AddTodo;
