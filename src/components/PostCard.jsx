import { getImagePreview } from "@/lib/postService";
import { useEffect, useState } from "react";
import { toggleLike } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";
import { getComments , createComment} from "@/lib/commentService";

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

  useEffect(() => {
    async function loadComments() {
      const res = await getComments(post.$id);
      setComments(res.documents);
    }
    loadComments();
  } , [post.$id]); 

  const handleAddComment = async () => {
    if(!commentText.trim()) return;

    try {
      const newComment = await createComment(post.$id , user , commentText);
      setComments(prev => [newComment , ...prev]);
      setCommentText("");
    } catch (err) {
      console.log("Comment error : ", err);
    }
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
          {/* comment input */}
          <div className="flex items-center gap-2 mb-3">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded bg-black/30 text-white outline-none"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-white"
            >
              Post
            </button>
          </div>

          {/* comment list */}
          <div className="space-y-3">
            {comments.map(c => (
              <div key={c.$id} className="p-2 bg-black/20 rounded-md border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white text-xs">
                    {c.username[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{c.username}</p>
                    <p className="text-gray-400 text-xs">{new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-200 text-sm">{c.text}</p>
              </div>
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
