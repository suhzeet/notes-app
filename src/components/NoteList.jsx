import NoteCard from "./NoteCard";

function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <></>;
  }

  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
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
