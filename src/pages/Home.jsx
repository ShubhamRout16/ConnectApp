import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "@/lib/postService";
import PostCard from "@/components/PostCard";

export default function Home() {
  const { user } = useAuth();
  // home feed page feature
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.documents);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  } , []);

  if (loading) {
    return (
      <div className="text-white text-center py-10 text-xl">
        Loading Feed....
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-gray-900">
        <div className="text-center">
          <p className="text-xl mb-4">You are not logged in.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Home Feed</h1>

      {posts.length ===0  ? (
        <p className="text-gray-400">No posts yet. Create One!</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.$id} post={post}/>
        ))
      )}
    </div>
  );
}