import { useState } from "react";
import { uploadImage  , createPost } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
  const { user } = useAuth();
  const navigate = useNavigate();

  const [caption , setCaption] = useState("");
  const [image , setImage] = useState(null);
  const [previewUrl , setPreviewUrl] = useState("");
  const [loading , setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image){
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      // try uploading the image
      const imageId = await uploadImage(image);

      // create a post in the database
      await createPost({
        caption,
        imageId,
        userId: user.$id,
      });

      // redirect the user to the home page after creaating the post
      navigate("/");
    }catch (err){
      console.log(err);
      alert("Failed to create Post");
    }finally{
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/5 backdrop-blur-xl p-6 rounded-xl"
      >
        {/* Image preview */}
        {previewUrl && (
          <img 
            src={previewUrl}
            alt="preview"
            className="w-full rounded-xl object-cover"
          />
        )}

        {/* image input */}
        <div>
          <label className="block mb-2 text-gray-300">Upload Image</label>
          <input 
            type="file"
            accept="image/*"
            className="block w-full text-white"
            onChange={handleImageChange}
          />
        </div>

        {/* caption input */}
        <div>
          <label className="block mb-2 text-gray-300">Caption</label>
          <input 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-purple-400"
            rows="3"
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-300 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}