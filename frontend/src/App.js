import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import AdminStudents from "./admin/AdminStudents";
import StudentProfile from "./student/StudentProfile";
import ProtectedRoute from "./auth/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* 403 */}
        <Route path="/403" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
