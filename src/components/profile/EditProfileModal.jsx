/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef } from "react";
import { updateProfile } from "@/lib/profileService";
import { getImagePreview } from "@/lib/postService";
import { Camera, Upload, User, MapPin, Link as LinkIcon, Sparkles, Check, X } from "lucide-react";

export default function EditProfileModal({ open, onClose, user, onUpdated }) {
  if (!open) return null;

  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  // --- IMAGE PREVIEWS ---
  // Use getImagePreview for existing images from Appwrite
  const [bannerPreview, setBannerPreview] = useState(
    user.bannerUrl ? getImagePreview(user.bannerUrl) : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
  );

  const [avatarPreview, setAvatarPreview] = useState(
    user.avatarUrl ? getImagePreview(user.avatarUrl) : "https://picsum.photos/200"
  );

  const bannerRef = useRef(null);
  const avatarRef = useRef(null);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      // Create local preview URL for newly selected file
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Create local preview URL for newly selected file
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    console.log("FORM BEFORE SUBMIT:", form);
    console.log("Avatar FILE before submit:", avatarFile);
    console.log("Banner FILE before submit:", bannerFile);
    
    try {
      const updated = await updateProfile(user.$id, form, avatarFile, bannerFile);
      console.log("Received UPDATED USER:", updated);
      onUpdated(updated);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="relative bg-[#0b0b0f] text-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">

        {/* -------- HEADER TOP -------- */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold tracking-tight">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* -------- BANNER EDITOR -------- */}
        <div className="relative h-44 group overflow-hidden bg-black">
          <img
            src={bannerPreview}
            alt="Banner preview"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-transparent" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              onClick={() => bannerRef.current.click()}
              className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:scale-110 transition-transform"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>

          <input
            type="file"
            ref={bannerRef}
            className="hidden"
            accept="image/*"
            onChange={handleBannerChange}
          />
        </div>

        {/* -------- AVATAR EDITOR -------- */}
        <div className="relative px-6 -mt-14 mb-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#0b0b0f] group cursor-pointer">
            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />

            {/* Hover Upload Overlay */}
            <div
              onClick={() => avatarRef.current.click()}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
            >
              <Upload className="w-7 h-7 text-white" />
            </div>
          </div>

          <input
            type="file"
            ref={avatarRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        {/* -------- FORM CONTENT -------- */}
        <div className="px-6 space-y-6 pb-6">

          {/* NAME */}
          <Field
            label="Display Name"
            icon={<User className="w-4 h-4" />}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* BIO */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              Bio
            </label>

            <div className="relative group">
              <textarea
                rows="3"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="
                  w-full bg-white/3 border border-white/10 p-3 rounded-xl 
                  text-sm placeholder-slate-600 text-slate-200 
                  focus:border-purple-500/40 focus:bg-white/5 transition
                "
                placeholder="Tell the world about yourself..."
              />

              <Sparkles className="absolute bottom-3 right-3 w-4 h-4 text-purple-400/40" />
            </div>
          </div>

          {/* LOCATION + WEBSITE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Location"
              icon={<MapPin className="w-4 h-4" />}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <Field
              label="Website"
              icon={<LinkIcon className="w-4 h-4" />}
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
        </div>

        {/* -------- ACTION FOOTER -------- */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-white/10 bg-[#0c0c13]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm rounded-xl text-slate-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="relative px-7 py-2.5 rounded-xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-fuchsia-600 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-black/20" />
            <span className="relative flex items-center gap-2 text-white font-semibold text-sm">
              <Check className="w-4 h-4" /> Save Changes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Neon Input Component --- */
function Field({ label, value, onChange, icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
        {label}
      </label>

      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center text-slate-500 group-focus-within:text-purple-400 transition">
          {icon}
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          className="
            w-full pl-10 pr-4 py-3 bg-white/3 border border-white/10 
            rounded-xl text-sm text-slate-200 placeholder-slate-600 
            focus:outline-none focus:bg-white/5 focus:border-purple-500/40 
            focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}