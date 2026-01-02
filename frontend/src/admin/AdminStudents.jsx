import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/axios";

/* ================= STYLES ================= */

const Page = styled.div`
  padding: 32px;
  background: #f4f6f8;
  min-height: 100vh;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Greeting = styled.h2`
  margin: 0;
`;

const SubText = styled.p`
  margin: 6px 0 0;
  color: #666;
`;

const TopActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: ${({ danger }) => (danger ? "#dc3545" : "#008080")};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

const FiltersBox = styled.div`
  margin: 28px 0;
  padding: 16px;
  border-radius: 10px;
  background: #f1f3f5;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const ClearBtn = styled.button`
  margin-top: 12px;
  background: transparent;
  border: none;
  color: #008080;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #e9ecef;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const RowActions = styled.div`
  display: flex;
  gap: 8px;
`;

const EmptyState = styled.p`
  margin-top: 20px;
  color: #666;
`;

/* ================= MODAL ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 380px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
`;

/* ================= COMPONENT ================= */

export default function AdminStudents() {
  const [adminName, setAdminName] = useState("Admin");
  const [students, setStudents] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    department: "",
    year: "",
  });

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const emptyStudent = {
    name: "",
    department: "",
    year: "",
    username: "",
  };

  const [formData, setFormData] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState("");

  /* -------- ADMIN NAME FROM JWT -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setAdminName(payload.name || payload.username || "Admin");
      } catch {}
    }
  }, []);

  /* -------- LOAD STUDENTS (MANUAL) -------- */
  const loadStudents = async () => {
    setError("");
    try {
      const res = await api.get("/api/admin/students");
      setStudents(res.data);
    } catch {
      setError("Failed to load students");
    }
  };

  /* -------- CREATE -------- */
  const createStudent = async () => {
    try {
      await api.post("/api/admin/students", formData);
      setShowCreate(false);
      setFormData(emptyStudent);
      loadStudents();
    } catch {
      alert("Failed to create student");
    }
  };

  /* -------- UPDATE (BY ID) -------- */
  const updateStudent = async () => {
    try {
      await api.patch(`/api/admin/students/${editingId}`, formData);
      setShowEdit(false);
      setEditingId(null);
      setFormData(emptyStudent);
      loadStudents();
    } catch {
      alert("Failed to update student");
    }
  };

  /* -------- DELETE (BY ID) -------- */
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await api.delete(`/api/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete student");
    }
  };

  /* -------- FILTER LOGIC -------- */
  const filteredStudents = students.filter((s) => {
    return (
      (filters.name === "" ||
        s.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.department === "" ||
        s.department
          .toLowerCase()
          .includes(filters.department.toLowerCase())) &&
      (filters.year === "" || String(s.year) === filters.year)
    );
  });

  return (
    <Page>
      <Card>
        <Header>
          <Greeting>Hello {adminName} 👋</Greeting>
          <SubText>Manage students — filter, create, update or delete</SubText>

          <TopActions>
            <Button onClick={loadStudents}>View Students</Button>
            <Button onClick={() => setShowCreate(true)}>
              Create Student
            </Button>
          </TopActions>
        </Header>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* FILTERS — ALWAYS VISIBLE */}
        <FiltersBox>
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
              value={filters.department}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  department: e.target.value,
                })
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

          <ClearBtn
            onClick={() =>
              setFilters({ name: "", department: "", year: "" })
            }
          >
            Clear filters
          </ClearBtn>
        </FiltersBox>

        {students.length === 0 && (
          <EmptyState>
            No students loaded. Click <b>“View Students”</b>.
          </EmptyState>
        )}

        {students.length > 0 && (
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Department</Th>
                <Th>Year</Th>
                <Th>Roll No</Th>
                <Th>Actions</Th>
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
                    <RowActions>
                      <Button
                        onClick={() => {
                          setEditingId(s.id);
                          setFormData(s);
                          setShowEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        danger
                        onClick={() => deleteStudent(s.id)}
                      >
                        Delete
                      </Button>
                    </RowActions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* CREATE MODAL */}
      {showCreate && (
        <Overlay>
          <Modal>
            <h3>Create Student</h3>

            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
            />
            <Input
              placeholder="Year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
            <Input
              placeholder="Roll Number"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />

            <ModalActions>
              <Button onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={createStudent}>Create</Button>
            </ModalActions>
          </Modal>
        </Overlay>
      )}

      {/* UPDATE MODAL */}
      {showEdit && (
        <Overlay>
          <Modal>
            <h3>Update Student</h3>

            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
            />
            <Input
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />

            <ModalActions>
              <Button onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button onClick={updateStudent}>Update</Button>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
}
