import { getImagePreview } from "@/lib/postService";
import { useEffect, useState } from "react";
import { toggleLike } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";
import { getComments , createComment, deleteComment , updateComment} from "@/lib/commentService";
import CommentMenu from "./commentMenu";
import CommentItem from "./CommentItem";

export default function PostCard({ post }) {
  const [imageUrl , setImageUrl] = useState("");

  // for the like feature
  const { user } = useAuth();
  const [likes , setLikes] = useState(post.likes || []);
  const isLiked = likes.includes(user.$id);

  // for the comment system features
  const [comments , setComments] = useState([]);
  const [commentText , setCommentText] = useState("");
  const [showComments , setShowComments] = useState(false);
  const [replyTo , setReplyTo] = useState(null);

  useEffect(() => {
    async function loadComments() {
      const res = await getComments(post.$id);
      setComments(res.documents);
    }
    loadComments();
  } , [post.$id]); 

  const handleAddComment = async (parentId = null) => {
    if(!commentText.trim()) return;

    const newC = await createComment(post.$id , user , commentText , parentId);
    setComments(prev => [...prev, newC]);
    setCommentText("");
    setReplyTo(null);
  };

  // delete comment persistent
  const handleDeleteComment = async (id) =>{
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.$id !== id));
  }

  // edit comment persistent
  const handleEditComment = async (updated) => {
    const saved = await updateComment(updated.$id , updated.text);

    setComments((prev) => prev.map((c) => (c.$id === saved.$id ? saved : c)));
  };

  const handleLike = async () => {
    try {
      const updated = await toggleLike(post.$id , user.$id , likes);
      setLikes(updated.likes);
    } catch(err) {
      console.log("Like error : " , err);
    }
  };

  useEffect(() => {
    async function loadImage() {
      const url = await getImagePreview(post.imageId);
      setImageUrl(url);
      console.log("Final URL:", url);
    }

    if (post.imageId) loadImage();
  }, [post.imageId]);

  // building the nested comment feature
  function buildCommentTree(comments){
    const map = {};
    const roots = [];

    // initialising the map
    comments.forEach(c => {
      map[c.$id] = {...c , replies: []};
    });

    // build tree
    comments.forEach(c => {
      if(c.parentId){
        map[c.parentId].replies.push(map[c.$id]);
      }else {
        roots.push(map[c.$id]);
      }
    });

    return roots;
  }

  const commentTree = buildCommentTree(comments);
  
  return (
    <div className="bg-white/5 backdrop-blue-xl rounded-xl p-4 border border-white/10 shadow-xl"> 
      {/* render only after URL is ready */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="post"
          className="w-full rounded-xl object-cover mb-4"
        />
      ) : (
        <div className="w-full h-48 rounded-xl bg-white/10 animate-pulse" />
      )}
      
      {/* caption */}
      <p className="text-gray-300 mb-2">{post.caption}</p>

      <button 
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-1 rounded-full 
        transition-all ${isLiked ? "bg-purple-600/30 text-purple-300" : "text-gray-400 hover:text-purple-300"}`}
      >
      <span className="text-lg">{isLiked ? "💜" : "🤍"}</span>
      <span>{likes.length}</span>
      </button>

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-gray-300 hover:text-white"
      >
      💬 {comments.length} Comments
      </button>

      {showComments && (
  <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">

    {/* Comment Input */}
    <div className="flex items-center gap-2 mb-4">
      <input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-2 rounded bg-black/30 text-white outline-none"
      />
      <button
        onClick={() => handleAddComment(replyTo)}
        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-white"
      >
        Post
      </button>
    </div>

    {replyTo && (
      <div className="text-sm text-violet-300 mb-2">
        Replying to comment #{replyTo} 
        <button
          className="ml-2 text-red-400"
          onClick={() => setReplyTo(null)}
        >
          Cancel
        </button>
      </div>
    )}

    {/* Nested Comment Tree */}
    <div className="space-y-4">
      {commentTree.map((root) => (
        <CommentItem 
          key={root.$id}
          comment={root}
          onReply={(id) => setReplyTo(id)}
          onEdit = {handleEditComment}
          onDelete = {handleDeleteComment}
        />
      ))}
    </div>
  </div>
)}
      {/* Meta */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>@{post.userId.slice(0,6)}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
