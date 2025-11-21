import { useState } from "react";
import { deleteComment, editComment } from "@/lib/commentService";

export default function CommentMenu({ comment, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleDelete = async () => {
    await deleteComment(comment.$id);
    onDelete(comment.$id);
    setOpen(false);
  };

  const handleEdit = async () => {
    const updated = await editComment(comment.$id, text);
    onEdit(updated);
    setEditing(false);
  };

  return (
    <div className="absolute top-2 right-2">
      {/* Three-dot button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-400 hover:text-white text-lg"
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && !editing && (
        <div className="absolute right-0 mt-1 w-28 bg-black/80 border border-white/10 rounded-lg shadow-xl z-10">
          <button
            onClick={() => setEditing(true)}
            className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10"
          >
            Delete
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {editing && (
        <div className="absolute right-0 mt-1 w-60 bg-black/80 border border-white/10 rounded-lg p-3 z-10">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-2 py-1 rounded bg-black/40 text-white outline-none text-sm"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setEditing(false)}
              className="text-gray-300 text-sm hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-violet-600 text-white rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
