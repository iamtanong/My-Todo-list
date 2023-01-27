import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

  async function handleDelete() {
    try {
      await axios.delete("http://localhost:8800/todos/" + delID);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const [dialogue, setDialogue] = useState<object>({ display: "none" });
  const [delID, setDelID] = useState<number>(-1);

  function confirmDel(id: number) {
    setDialogue({ display: "block" });
    setDelID(id);
  }

  function cancelDel() {
    setDialogue({ display: "none" });
    setDelID(-1);
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

  // document.getElementsByClassName()

  return (
    <div className="Todo">
      <div className="btn-group">
        <Link to="/new">Add Todo</Link>
      </div>
      <div className="td-li">
        {todos.map((td) => (
          <div className={td.important ? "td im" : "td"} key={td.id}>
            <div className="td-head">
              <button
                onClick={() => {
                  starClick(td);
                }}
              >
                <GiRoundStar fill={td.important ? "gold" : "black"} />
              </button>
              <h2>{td.name}</h2>
            </div>
            <h5>{td.description}</h5>
            <h4>{td.deadline}</h4>
            <div className="edit-del">
              <button
                onClick={() => {
                  navigate(`/edit/${td.id}`, { state: td });
                }}
              >
                <MdModeEdit fill="#000" />
              </button>
              <button
                onClick={() => {
                  confirmDel(td.id);
                }}
              >
                <AiFillDelete fill="#000" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="dialogue" style={dialogue}>
        <div className="front">
          <h3>Confirm Delete</h3>
          <div className="confirmdel">
            <button onClick={cancelDel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="bg"></div>
      </div>
    </div>
  );
}

export default Todo;
