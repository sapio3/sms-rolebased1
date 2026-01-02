import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import AdminStudents from "./admin/AdminStudents";
import StudentProfile from "./student/StudentProfile";
import ProtectedRoute from "./auth/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";

/* 🔥 DEV ONLY */
const DEV_RENDER = "ADMIN_STUDENTS";
// const DEV_RENDER = "STUDENT_PROFILE";
// const DEV_RENDER = "LOGIN";
// const DEV_RENDER = null; // ← normal app

function App() {
  // 🔥 Render ONE page directly (no auth, no router logic)
  if (DEV_RENDER === "ADMIN_STUDENTS") return <AdminStudents />;
  if (DEV_RENDER === "STUDENT_PROFILE") return <StudentProfile />;
  if (DEV_RENDER === "LOGIN") return <Login />;

  // 🔒 Normal app
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

        <Route path="/403" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
