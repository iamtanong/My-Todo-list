import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Error from "./components/Error";
// Lazy import
const Todos = lazy(() => wait(1000).then(() => import("./components/Todo")));
const AddTodo = lazy(() =>
  wait(1000).then(() => import("./components/AddTodo"))
);
const UpdateTodo = lazy(() =>
  wait(1000).then(() => import("./components/UpdateTodo"))
);

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Todos</NavLink>
        <NavLink to="/load">Loading</NavLink>
        <NavLink to="/awfjawlf404">Not found</NavLink>
      </nav>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/load" element={<Loading />} />

          <Route path="/" element={<Todos />} />
          <Route path="/addtodos" element={<AddTodo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />

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
