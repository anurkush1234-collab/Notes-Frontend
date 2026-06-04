import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const API = "https://notes-backend-i94o.onrender.com";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET all notes
  const getNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);
    } catch (error) {
      console.log("GET error:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ADD / UPDATE note
  const addNote = async () => {
    try {
      if (!title || !content) {
        alert("Please fill all fields");
        return;
      }

      if (editId) {
        await axios.put(`${API}/notes/${editId}`, {
          title,
          content,
        });
        setEditId(null);
      } else {
        await axios.post(`${API}/notes`, {
          title,
          content,
        });
      }

      setTitle("");
      setContent("");
      getNotes();
    } catch (error) {
      console.log("ADD/UPDATE error:", error);
    }
  };

  // DELETE note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/notes/${id}`);
      getNotes();
    } catch (error) {
      console.log("DELETE error:", error);
    }
  };

  // EDIT note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App 🚀</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={addNote}>
        {editId ? "Update Note" : "Add Note"}
      </button>

      <hr />

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => deleteNote(note._id)}>
            Delete
          </button>

          <button
            onClick={() => editNote(note)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;