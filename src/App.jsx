import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch notes");
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

      if (!response.ok) throw new Error("Failed to add note");

      const newNote = await response.json();
      setNotes((prev) => [newNote, ...prev]);
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

      if (!response.ok) throw new Error("Failed to update note");

      const data = await response.json();
      setNotes((prev) => prev.map((note) => (note._id === id ? data : note)));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="text-left text-4xl md:text-5xl font-bold mb-8 text-slate-800 flex gap-4 items-center justify-center md:justify-start">
          Likhit
        </h1>
      </header>

      <main className="main space-y-8">
        {/* CREATE NOTE */}
        <NoteForm onSubmit={addNote} />

        {/* NOTES LIST */}
        {loading ? (
          <div className="loading absolute top-[40%] right-[45%]">
            <Loader2 className="animate-spin" size={128} />
          </div>
        ) : (
          <NoteList
            notes={notes}
            updateNote={updateNote}
            onDelete={deleteNote}
          />
        )}
      </main>
    </div>
  );
}

export default App;
