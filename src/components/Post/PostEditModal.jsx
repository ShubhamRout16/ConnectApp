import React, {  useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { X, Check , ImageIcon } from "lucide-react";

export default function PostEditModal({ open , initialText , initialImage , onClose , onSave , saving}) {
  const [text, setText] = useState(initialText || "");
  const [previewUrl, setPreviewUrl] = useState(initialImage || "");
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setNewImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSave({
      caption: text,
      newImageFile,
    });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="relative z-50 max-w-2xl w-full px-4"
      >
        <GlassCard className="p-6">
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Edit Post</h3>
            <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* caption input */}
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Edit your caption..."
            className="mt-4 w-full min-h-[120px] bg-transparent resize-none outline-none text-slate-100 text-[15px] leading-relaxed"
          />

          {/* image preview */}
          {previewUrl && (
            <div className="mt-4 rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-[300px] object-cover"
              />
            </div>
          )}

          {/* upload new image button */}
          <div className="mt-4">
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 cursor-pointer transition">
              <ImageIcon className="w-5 h-5 text-neon-purple"/>
              Change Image
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          {/* footer buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-slate-400 hover:text-white">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`px-5 py-2 rounded-xl font-bold transition-all ${
                saving ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-linear-to-r from-neon-purple to-neon-fuchsia text-white shadow-neon-purple/20"
              }`}
            >
              {saving ? "saving..." : (
                <span className="flex items-center gap-2"><Check className="w-4 h-4"/> Save</span>
              )}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}