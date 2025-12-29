import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f6f8",
      }}
    >
      <h1>403 – Access Denied</h1>
      <p>You do not have permission to access this page.</p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          background: "#008080",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Go to Login
      </button>
    </div>
  );
}
