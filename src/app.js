import { useEffect, useState } from "react";
import axios from "axios";

/* Replace with your Render backend URL */
const API_URL = "https://hostel-backend-wpv0.onrender.com";


function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    roomNo: "",
    department: "",
    year: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(`${API_URL}/students`);
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post(`${API_URL}/students`, form);
    setForm({ name: "", rollNo: "", roomNo: "", department: "", year: "" });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/students/${id}`);
    fetchStudents();
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>🏨 Hostel Student Management (LIVE)</h2>

      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Roll No" value={form.rollNo}
        onChange={e => setForm({ ...form, rollNo: e.target.value })} />

      <input placeholder="Room No" value={form.roomNo}
        onChange={e => setForm({ ...form, roomNo: e.target.value })} />

      <input placeholder="Department" value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })} />

      <input placeholder="Year" value={form.year}
        onChange={e => setForm({ ...form, year: e.target.value })} />

      <br /><br />
      <button onClick={addStudent}>Add Student</button>

      <hr />

      {students.map((s) => (
        <div key={s._id}>
          {s.name} | Room {s.roomNo}
          <button onClick={() => deleteStudent(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
