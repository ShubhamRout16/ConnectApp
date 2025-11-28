import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, Trash2, Edit3 } from "lucide-react";

export default function CommentItem({
  comment,
  onReply,
  onEdit,
  onDelete,
  isReply = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  // logged-in user
  const localUser = JSON.parse(localStorage.getItem("user"));
  const isOwnComment = comment.userId === localUser?.$id;

  const handleSave = () => {
    const updated = { ...comment, text: editText };
    onEdit(updated);
    setIsEditing(false);
  };

  return (
    <div className={`flex gap-3 mb-5 group ${isReply ? "ml-12 relative" : ""}`}>
      {/* Left vertical line for replies */}
      {isReply && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-linear-to-b from-slate-800 to-transparent" />
      )}

      {/* Avatar */}
      <Avatar
        src={comment.avatarUrl || "https://picsum.photos/id/65/200/200"}
        alt={comment.username}
        size="sm"
      />

      {/* Right Side */}
      <div className="flex-1">

        {/* Username + Timestamp */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-200 hover:text-neon-purple cursor-pointer transition">
            {comment.username}
          </span>

          <span className="text-xs text-slate-500 font-mono">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Comment Text / Edit Mode */}
        {isEditing ? (
          <div className="mt-2">
            <input
              className="w-full bg-slate-900/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="flex gap-4 mt-2 text-xs">
              <button
                onClick={handleSave}
                className="text-green-400 hover:text-green-300"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="text-red-400 hover:text-red-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-300 mt-1 leading-relaxed font-light">
            {comment.text}
          </p>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-4 mt-2 text-xs font-medium text-slate-500">

            {/* Like (still UI only) */}
            <button className="flex items-center gap-1 hover:text-neon-fuchsia transition">
              <Heart className="w-3.5 h-3.5" />
              Like
            </button>

            {/* Reply - IMPORTANT: send entire comment object */}
            <button
              onClick={() => onReply(comment)}
              className="flex items-center gap-1 hover:text-neon-purple transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Reply
            </button>

            {/* Edit button (only if own comment) */}
            {isOwnComment && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 hover:text-neon-purple text-slate-400 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            )}

            {/* Delete button */}
            {isOwnComment && (
              <button
                onClick={() => onDelete(comment.$id)}
                className="flex items-center gap-1 hover:text-red-400 text-slate-500 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
          </div>
        )}

        {/* CHILD REPLIES */}
        {comment.replies?.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.$id}
                comment={reply}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
