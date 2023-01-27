import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo"
})

// * Allow to send data from outside
app.use(express.json())
// * Allow CORs
app.use(cors());


app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

// !! Send Data
app.get("/todos", (req, res) => {
    const q = "SELECT * FROM todo.todo_list"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

// !! Add Data
app.post("/todos", (req, res) => {
    const q = "INSERT INTO todo_list (`name`, `description`, `deadline`, `important`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.deadline,
        req.body.important
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Data Added SUCCESS.")
    });
})

// !! Delete Data
app.delete("/todos/:id", (req, res) => {
    const ID = req.params.id;
    const q = "DELETE FROM todo_list WHERE id = ?"

    db.query(q, [ID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Delete Data SUCCESS.")
    })
})

// !! Update Data
app.put("/todos/:id", (req, res) => {
    const ID = req.params.id;
    const q = "UPDATE todo_list SET `name` = ?, `description` = ?, `deadline` = ?, `important` =? WHERE id = ?"

    const values = [
        req.body.name,
        req.body.description,
        req.body.deadline,
        req.body.important
    ];

    db.query(q, [...values, ID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Delete Data SUCCESS.")
    })
})

app.listen(8800, () => {
    console.log("connected")
})
