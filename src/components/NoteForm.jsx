import { Check, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

const COLORS = [
  "#ffffff",
  "#fec971",
  "#fe9b72",
  "#b693fd",
  "#00d4fe",
  "#e4ee91",
];

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    color: "#ffffff",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        color: editingNote.color || "#ffffff",
      });
    }
  }, [editingNote]);

  const { title, content, color } = formData;

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ ...editingNote, title, content, color });

    if (!editingNote) {
      setFormData({ title: "", content: "", color: "#ffffff" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-left h-90 relative flex flex-col p-6 rounded-2xl border border-white/50 shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full bg-transparent outline-none placeholder-gray-400 text-xl font-bold text-gray-800 mb-2"
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => updateField("content", e.target.value)}
        className="w-full text-md bg-transparent outline-none placeholder-gray-400 text-lg font-semibold text-gray-600 mb-5 flex-1 whitespace-pre-wrap leading-7"
        rows="4"
      />

      <div className="flex items-center justify-between pt-4 border-t border-black/8">
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => updateField("color", c)}
              className={`w-4 h-4 rounded-sm border border-slate-400 ${
                color === c ? "scale-110" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {editingNote && (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-lg bg-black/6 text-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-red-500/15 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className="p-2 rounded-lg bg-black/6 text-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-green-500/15 hover:text-green-500"
          >
            {editingNote ? <Check size={18} /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default NoteForm;
