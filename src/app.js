import React, { useEffect, useState } from "react";

const API_URL = "https://hostel-backend-wpv0.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);

  // Load students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Backend not responding");
    }
  };

  // Add student
  const addStudent = async () => {
    if (!name || !room) {
      alert("Please enter all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, room })
      });

      const data = await res.json();
      setStudents([...students, data]);
      setName("");
      setRoom("");
    } catch (err) {
      alert("Failed to connect backend");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🏠 Hostel Student Management</h1>

      <div className="card">
        <h2>Add Student</h2>

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Room Number"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <button onClick={addStudent} disabled={loading}>
          {loading ? "Saving..." : "Add Student"}
        </button>
      </div>

      <div className="card">
        <h2>Student List</h2>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
