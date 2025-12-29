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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2``;

const Button = styled.button`
  background: #008080;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f1f1f1;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const Danger = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
`;

/* -------- MODAL -------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 360px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

/* ---------------- COMPONENT ---------------- */
export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ name: "", dept: "", year: "" });
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    department: "",
    year: "",
    username: "",
  });
  const [error, setError] = useState("");

  /* ---------- LOAD ---------- */
  const loadStudents = async () => {
    setError("");
    try {
      const res = await api.get("/api/admin/students");
      setStudents(res.data);
    } catch (err) {
      setError("Failed to load students");
    }
  };

  /* ---------- ADD ---------- */
  const addStudent = async () => {
    try {
      await api.post("/api/admin/students", newStudent);
      setShowModal(false);
      setNewStudent({
        name: "",
        department: "",
        year: "",
        username: "",
      });
      loadStudents();
    } catch {
      alert("Failed to add student");
    }
  };

  /* ---------- DELETE ---------- */
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;
    try {
      await api.delete(`/api/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete student");
    }
  };

  /* ---------- FILTER ---------- */
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      s.department.toLowerCase().includes(filters.dept.toLowerCase()) &&
      (filters.year === "" || String(s.year) === filters.year)
  );

  return (
    <Page>
      <Card>
        <Header>
          <Title>Student Management</Title>
          <div>
            <Button onClick={loadStudents}>View Students</Button>{" "}
            <Button onClick={() => setShowModal(true)}>Add Student</Button>
          </div>
        </Header>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {students.length > 0 && (
          <>
            <Filters>
              <Input
                placeholder="Filter by name"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
              <Input
                placeholder="Filter by department"
                value={filters.dept}
                onChange={(e) =>
                  setFilters({ ...filters, dept: e.target.value })
                }
              />
              <Input
                placeholder="Filter by year"
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
              />
            </Filters>

            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Year</Th>
                  <Th>Roll No</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <Td>{s.name}</Td>
                    <Td>{s.department}</Td>
                    <Td>{s.year}</Td>
                    <Td>{s.username}</Td>
                    <Td>
                      <Danger onClick={() => deleteStudent(s.id)}>
                        Delete
                      </Danger>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card>

      {showModal && (
        <Overlay>
          <Modal>
            <h3>Add Student</h3>

            <Input
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <Input
              placeholder="Department"
              value={newStudent.department}
              onChange={(e) =>
                setNewStudent({ ...newStudent, department: e.target.value })
              }
            />
            <Input
              placeholder="Year"
              value={newStudent.year}
              onChange={(e) =>
                setNewStudent({ ...newStudent, year: e.target.value })
              }
            />
            <Input
              placeholder="Roll Number"
              value={newStudent.username}
              onChange={(e) =>
                setNewStudent({ ...newStudent, username: e.target.value })
              }
            />

            <ModalActions>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={addStudent}>Save</Button>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}
