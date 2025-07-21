// import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";

const App = () => {
  const isLoggedIn = localStorage.getItem("token"); // check token

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/todo" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
