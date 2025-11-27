import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { X, Check, ImageIcon } from "lucide-react";

export default function PostEditModal({
  open,
  initialText,
  initialImage,
  onClose,
  onSave,
  saving,
}) {
  const [text, setText] = useState(initialText || "");
  const [previewUrl, setPreviewUrl] = useState(initialImage || "");
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="relative z-50 w-full max-w-lg px-3"
      >
        <div className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Edit Post
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CAPTION INPUT */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-transparent text-slate-200 resize-none min-h-[100px] outline-none text-[15px]"
            />
          </div>

          {/* IMAGE PREVIEW */}
          <div className="mt-4">
            {previewUrl ? (
              <div className="rounded-xl overflow-hidden border border-white/10 max-h-[280px]">
                <img
                  src={previewUrl}
                  className="w-full object-cover"
                  alt="Post preview"
                />
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-[180px] border border-white/10 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
                <ImageIcon className="w-7 h-7 text-gray-300 mb-2" />
                <span className="text-gray-400 text-sm font-medium">
                  Add Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            )}
          </div>

          {/* CHANGE IMAGE BUTTON */}
          {previewUrl && (
            <div className="mt-3 flex justify-start">
              <label className="cursor-pointer text-sm text-neon-purple hover:text-neon-fuchsia transition flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">
                <ImageIcon className="w-4 h-4" />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            </div>
          )}

          {/* FOOTER BUTTONS */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`px-5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                saving
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-linear-to-r from-neon-purple to-neon-fuchsia text-white"
              }`}
            >
              {saving ? "Saving..." : <> <Check className="w-4 h-4" /> Save </>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
