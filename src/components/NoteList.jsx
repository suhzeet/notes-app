import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";

function NoteList({ notes, onDelete, updateNote, onAdd }) {
  return (
    <div className="grid gap-4 md:gap-10 w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      <NoteForm onSubmit={onAdd} />
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
}

export default NoteList;
