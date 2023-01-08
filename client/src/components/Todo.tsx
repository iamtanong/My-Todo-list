import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { toFormData } from "axios";
import "./Todo.css";

import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GiRoundStar } from "react-icons/gi";

function Todo() {
  const [todos, setTodos] = useState<Array<any>>([]);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/todos");
        setTodos(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();
  }, []);

  async function handleDelete(id: number) {
    try {
      await axios.delete("http://localhost:8800/todos/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  function starClick(todo: any) {
    console.log(!todo.important);
    let send_data = {
      id: todo.id,
      name: todo.name,
      description: todo.description,
      deadline: todo.deadline,
      important: !todo.important ? 1 : 0,
    };
    try {
      axios.put("http://localhost:8800/todos/" + todo.id, send_data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Todo">
      <div className="btn-group">
        <Link to="/addtodos">Add Todo</Link>
      </div>
      <div className="td-li">
        {todos.map((td, index) => (
          <div className="td" key={td.id}>
            <div className="td-head">
              <button
                onClick={() => {
                  starClick(td);
                }}
              >
                <GiRoundStar fill={td.important ? "gold" : "black"} />
              </button>
              <h2>
                {index + 1}. {td.name}
              </h2>
            </div>
            <h5>{td.description}</h5>
            <h4>{td.deadline}</h4>
            <div className="edit-del">
              <button
                onClick={() => {
                  navigate(`/update/${td.id}`, { state: td });
                }}
              >
                <MdModeEdit fill="#000" />
              </button>
              <button
                onClick={() => {
                  handleDelete(td.id);
                }}
              >
                <AiFillDelete fill="#000" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
