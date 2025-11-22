import { useState } from "react"

export default function CommentItem({ comment , onReply , onEdit , onDelete }) {
  const [isEditing , setIsEditing] = useState(false);
  const [editText , setEditText] = useState(comment.text);

  const handleSave = () => {
    const updated = { ...comment , text: editText};
    onEdit(updated);
    setIsEditing(false);
  }


  return (
    <div className="ml-4 mt-3">
      {/* user info */}
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 bg-violet-500 rounded-full flex justify-center items-center text-white text-sm">
          {comment.username[0]}
        </div>
        <div>
          <p className="font-semibold text-sm text-white">{comment.username}</p>
          <p className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      </div>


      {/* Edit mode */}
      {isEditing ? (
        <div>
          <input 
            className="px-2 py-1 w-full rounded bg-black/40 text-white"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="flex gap-3 mt-2 text-xs">
            <button onClick={handleSave} className="text-green-400 hover:text-green-300">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // normal text
        <p className="ml-10 text-gray-200 mt-1">{comment.text}</p>
      )}

      {/* action buttons */}
      {!isEditing && (
        <div className="ml-10 flex gap-4 text-xs text-gray-400 mt-1">
        <button onClick={() => onReply(comment.$id)} className="hover:text-white">Reply</button>
        <button onClick={() => setIsEditing(true)} className="hover:text-white">Edit</button>
        <button onClick={() => onDelete(comment.$id)} className="hover:text-red-400">Delete</button>
      </div>
      )}
      

      {/* render replies recursively */}
      {comment.replies.length > 0 && (
        <div className="ml-6 border-l border-gray-700 pl-4 mt-2">
          {comment.replies.map((r) => (
            <CommentItem 
              key={r.$id}
              comment={r}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}