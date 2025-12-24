import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

/* ---------------- CONFIG ---------------- */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

/* ---------------- THEMES ---------------- */
const lightTheme = {
  background: "#FFFFFF",
  primary: "#008080",
  text: "#2E2E2E",
  card: "#F9F9F9",
  border: "#DDDDDD",
};

const darkTheme = {
  background: "#121212",
  primary: "#00B3B3",
  text: "#EAEAEA",
  card: "#1E1E1E",
  border: "#2C2C2C",
};

/* ---------------- GLOBAL ---------------- */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: Inter, system-ui, sans-serif;
    transition: background 0.3s, color 0.3s;
  }
`;

/* ---------------- STYLES ---------------- */
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Toggle = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  background: none;
  color: ${({ theme }) => theme.text};
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.div`
  margin-top: 12px;
  color: ${({ error }) => (error ? "#dc3545" : "#28a745")};
  font-size: 14px;
`;

/* ---------------- COMPONENT ---------------- */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      navigate('/admin/students')
      setSuccess("Login successful");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Wrapper>
        <Card>
          <Header>
            <Title>Login</Title>
            <Toggle onClick={toggleTheme}>
              {theme === "light" ? "Dark" : "Light"}
            </Toggle>
          </Header>

          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <Message error>{error}</Message>}
            {success && <Message>{success}</Message>}

            <Button type="submit">Login</Button>
          </form>
        </Card>
      </Wrapper>
    </ThemeProvider>
  );
}
