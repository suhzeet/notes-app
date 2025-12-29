import { Pencil, Trash2 } from "lucide-react";

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      className=" text-left w-76 h-90 relative flex flex-col  p-6 rounded-2xl border border-white/50 shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      style={{ backgroundColor: note.color || "#ffffff" }}
    >
      {/* Top gradient bar */}
      <span className="absolute top-0 left-0 right-0 h-1 bg-linear-to-tr from-[#667eea] to-[#764ba2] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>

      <h3 className="text-xl font-bold text-gray-800 mb-4 wrap-break-word -tracking-[0.3px] leading-[1.3]">
        {note.title}
      </h3>
      <p className="text-md font-semibold text-gray-600 mb-5 flex-1 wrap-break-word whitespace-pre-wrap leading-7">
        {note.content}
      </p>

      <div className="flex justify-between items-center border-t border-black/8 pt-4 mt-auto">
        <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
          {formatDate(note.createdAt)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            title="Edit"
            className="p-2 rounded-lg bg-black/6 text-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#667eea]/15 hover:text-[#667eea]"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            title="Delete"
            className="p-2 rounded-lg bg-black/6 text-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-red-500/15 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NoteCard;
