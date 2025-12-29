import React, { useState } from "react";
import styled from "styled-components";
import api from "../api/axios";

/* ---------------- STYLES ---------------- */
const Page = styled.div`
  padding: 32px;
  background: #f4f6f8;
  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const Row = styled.div`
  margin-bottom: 14px;
`;

const Label = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: #008080;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
`;

const Message = styled.p`
  margin-top: 12px;
  color: ${({ error }) => (error ? "#dc3545" : "#28a745")};
`;

/* ---------------- COMPONENT ---------------- */
export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ---------- LOAD PROFILE ---------- */
  const loadProfile = async () => {
    setError("");
    setMessage("");
    try {
      const res = await api.get("/api/student/me");
      setProfile(res.data);
      setEditData(res.data);
    } catch {
      setError("Failed to load profile");
    }
  };

  /* ---------- UPDATE PROFILE ---------- */
  const updateProfile = async () => {
    setError("");
    setMessage("");

    // send only changed fields
    const payload = {};
    Object.keys(editData).forEach((key) => {
      if (editData[key] !== profile[key]) {
        payload[key] = editData[key];
      }
    });

    if (Object.keys(payload).length === 0) {
      setMessage("No changes to update");
      return;
    }

    try {
      await api.patch("/api/student/me", payload);
      setProfile({ ...profile, ...payload });
      setMessage("Profile updated successfully");
    } catch {
      setError("Failed to update profile");
    }
  };

  return (
    <Page>
      <Card>
        <Title>My Profile</Title>

        {!profile && (
          <Button onClick={loadProfile}>Load My Profile</Button>
        )}

        {profile && (
          <>
            <Row>
              <Label>Name</Label>
              <Input
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </Row>

            <Row>
              <Label>Department</Label>
              <Input
                value={editData.department || ""}
                onChange={(e) =>
                  setEditData({ ...editData, department: e.target.value })
                }
              />
            </Row>

            <Row>
              <Label>Year</Label>
              <Input
                value={editData.year || ""}
                onChange={(e) =>
                  setEditData({ ...editData, year: e.target.value })
                }
              />
            </Row>

            <Row>
              <Label>Roll Number</Label>
              <Input value={profile.username} disabled />
            </Row>

            <Button onClick={updateProfile}>Save Changes</Button>
          </>
        )}

        {error && <Message error>{error}</Message>}
        {message && <Message>{message}</Message>}
      </Card>
    </Page>
  );
}
