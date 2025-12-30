import { useState, useEffect } from "react";
import { Loader2, NotebookPen } from "lucide-react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      });
      const data = await response.json();
      setNotes(notes.map((note) => (note._id === id ? data : note)));
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app ">
      <header className="header">
        <h1 className=" text-left  text-4xl md:text-5xl font-bold mb-8 text-slate-800  flex gap-4 items-center justify-center md:justify-start">
          {/* <img src="/logo.png" height={42} width={42} /> */}
          Likhit
        </h1>
      </header>
      <main className="main">
        {loading ? (
          <div className="loading absolute top-[40%] right-[45%]">
            <Loader2 className="animate-spin " size={128} />
          </div>
        ) : (
          <NoteList
            updateNote={updateNote}
            notes={notes}
            onEdit={setEditingNote}
            onDelete={deleteNote}
          />
        )}
      </main>
    </div>
  );
}

export default App;
