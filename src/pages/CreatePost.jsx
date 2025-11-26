/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion , AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  X,
  MapPin,
  Smile,
  Hash,
  Image as ImageIcon
} from "lucide-react";

import { uploadImage, createPost } from "@/lib/postService";
import { useAuth } from "@/context/useAuth";
import GlassCard from "@/components/ui/GlassCard";
import Avatar from "@/components/ui/Avatar";
import FileUploadArea from "@/components/Feed/FileUploadArea";
import { CURRENT_USER } from "../constant";

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState(null); // real file for upload
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // handling the image selection 
  const handleFileSelect = (file) => {
    setPreviewFile(file);
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewFile(null);
  };

  // simulating the ai caption generation
  const handleAiGenerate = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setCaption(
        (prev) =>
          prev +
          " 🌌 Just exploring the infinite possibilities of the cosmos! #FutureIsNow"
      );
      setIsAiLoading(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !previewFile) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);

    try {
      const imageId = await uploadImage(previewFile);

      await createPost({
        caption,
        imageId,
        userId: user.$id,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto pt-4 pb-20"
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
          Create New Post
        </h1>
      </div>

      {/* MAIN CARD */}
      <GlassCard className="p-6 md:p-8 border-neon-purple/20 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={user.avatarUrl || "https://picsum.photos/id/64/200/200"}
            alt={user.name}
            size="lg"
            hasStory={true}
          />
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {user.name}
            </h3>
            <p className="text-sm font-mono text-neon-purple/80">Posting publicly</p>
          </div>
        </div>

        {/* CAPTION */}
        <div className="relative mb-6">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's happening in the cosmos?"
            className="w-full bg-transparent text-xl text-slate-100 placeholder-slate-600 focus:outline-none resize-none min-h-[150px] font-light leading-relaxed"
            autoFocus
          />

          {/* AI Assist Button */}
          <button
            onClick={handleAiGenerate}
            disabled={isAiLoading}
            className="absolute right-2 top-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-neon-purple/10 to-neon-fuchsia/10 border border-neon-purple/20 text-neon-purple text-xs font-bold uppercase tracking-wider hover:border-neon-purple/50 transition-all group"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? "animate-spin" : ""}`} />
            {isAiLoading ? "Thinking..." : "AI Assist"}
          </button>
        </div>

        {/* IMAGE PREVIEW / UPLOAD */}
        <AnimatePresence mode="wait">
          {selectedImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 group"
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full max-h-[400px] object-cover"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

              <button
                onClick={removeImage}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <FileUploadArea onFileSelect={handleFileSelect} />
          )}
        </AnimatePresence>

        {/* TOOLS + SUBMIT */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
          {/* Tools */}
          <div className="flex gap-2">
            <ToolButton
              icon={ImageIcon}
              tooltip="Photo/Video"
              onClick={() =>
                document.querySelector('input[type="file"]')?.click()
              }
            />
            <ToolButton icon={Hash} tooltip="Tags" />
            <ToolButton icon={Smile} tooltip="Feeling" />
            <ToolButton icon={MapPin} tooltip="Location" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!caption.trim() && !selectedImage}
              className={`
                px-8 py-2.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center gap-2
                ${
                  !caption.trim() && !selectedImage
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-linear-to-r from-neon-purple to-neon-fuchsia text-white shadow-neon-purple/25 hover:shadow-neon-purple/40 hover:-translate-y-0.5"
                }
              `}
            >
              {loading ? "Posting…" : "Post"}
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

const ToolButton = ({ icon: Icon, tooltip, active = true, onClick }) => (
  <button
    onClick={onClick}
    disabled={!active}
    className={`
      p-3 rounded-xl transition-all duration-300
      ${
        active
          ? "text-neon-purple hover:bg-neon-purple/10 hover:scale-110 cursor-pointer"
          : "text-slate-600 cursor-default opacity-50"
      }
    `}
    title={tooltip}
  >
    <Icon className="w-5 h-5" />
  </button>
);
