import { Check, Plus, Send, X } from "lucide-react";
import { useState } from "react";

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
    title: editingNote?.title || "",
    content: editingNote?.content || "",
    color: editingNote?.color || "#ffffff",
  });

  const { title, content, color } = formData;

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, content, color });

    if (!editingNote) {
      setFormData({ title: "", content: "", color: "#ffffff" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-76 h-90 p-6 flex flex-col rounded-2xl shadow-md mb-10 bg-white/95 backdrop-blur-md border border-white/50"
      style={{ backgroundColor: color }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full py-4 text-xl font-bold bg-transparent outline-none placeholder-gray-400 text-gray-800"
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => updateField("content", e.target.value)}
        className="w-full py-1.5 text-md font-semibold bg-transparent flex-1 outline-none leading-6 placeholder-gray-400 mb-5 text-gray-600"
        rows="4"
      />
      <div className=" flex items-center justify-between gap-1 py-2 pt-4 border-t border-black/8">
        <div className=" flex gap-2 items-center justify-center">
          {COLORS.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className={`w-4 h-4 rounded-sm border border-slate-400 shadow-sm transition-all duration-200 ease-in-out   hover:scale-120 hover:shadow-md ${
                color === colorOption
                  ? "border-[#667eea] scale-110 shadow-[0_0_0_3px_rgba(102,126,234,0.3)]"
                  : ""
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => updateField("color", colorOption)}
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
