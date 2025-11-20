import { getImagePreview } from "@/lib/postService";
import { useEffect, useState } from "react";

export default function PostCard({ post }) {
  const [imageUrl , setImageUrl] = useState("");

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

      {/* Meta */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>@{post.userId.slice(0,6)}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}