import { getImagePreview } from "@/lib/postService";
import { useEffect, useState } from "react";
import { toggleLike } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";

export default function PostCard({ post }) {
  const [imageUrl , setImageUrl] = useState("");

  // for the like feature
  const { user } = useAuth();
  const [likes , setLikes] = useState(post.likes || []);
  const isLiked = likes.includes(user.$id);

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


      {/* Meta */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>@{post.userId.slice(0,6)}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}