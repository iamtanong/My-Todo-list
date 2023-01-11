import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Error from "./components/Error";
// Lazy import
// const Todo = lazy(() => wait(1000).then(() => import("./components/Todo")));
// const AddTodo = lazy(() =>
//   wait(1000).then(() => import("./components/AddTodo"))
// );
// const UpdateTodo = lazy(() =>
//   wait(1000).then(() => import("./components/UpdateTodo"))
// );

import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/new" element={<AddTodo />} />
          <Route path="/edit/:id" element={<UpdateTodo />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default App;
