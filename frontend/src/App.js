import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminStudents from "./admin/AdminStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/students" element={<AdminStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
