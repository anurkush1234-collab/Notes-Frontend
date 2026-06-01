import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  // GET all notes
  const getNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ADD note
  const addNote = async () => {
    if (editId) {
      // UPDATE mode
      await axios.put(`http://localhost:5000/notes/${editId}`, {
        title,
        content,
      });
      setEditId(null);
    } else {
      // CREATE mode
      await axios.post("http://localhost:5000/notes", {
        title,
        content,
      });
    }

    setTitle("");
    setContent("");
    getNotes();
  };

  // DELETE note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    getNotes();
  };

  // EDIT note (fill data in input)
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
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
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => deleteNote(note._id)}>
            Delete
          </button>

          <button onClick={() => editNote(note)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
