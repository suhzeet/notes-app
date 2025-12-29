import NoteCard from "./NoteCard";

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="grid gap-10 w-full justify-center items-center grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteList;
