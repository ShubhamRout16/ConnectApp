import { useNavigate } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { Image, BarChart2, Smile, MapPin } from "lucide-react";
import { CURRENT_USER } from "@/constant";
import GlassCard from "@/components/ui/GlassCard";

export default function CompactCreatePost() {
  const navigate = useNavigate();

  return (
    <GlassCard
      hoverEffect={true}
      onClick={() => navigate("/create-post")}
      className="p-4 mb-6 cursor-pointer group"
    >
      {/* Top row */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar
          src={CURRENT_USER.avatarUrl}
          alt={CURRENT_USER.name}
          size="md"
          hasStory={true}
        />
        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
          What's on your mind, {CURRENT_USER.name.split(" ")[0]}?
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 my-2"></div>

      {/* Bottom tools */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-neon-purple opacity-60 group-hover:opacity-100 transition-opacity">
          <Image className="w-5 h-5 hover:text-purple-300" />
          <BarChart2 className="w-5 h-5 hover:text-purple-300" />
          <Smile className="w-5 h-5 hover:text-purple-300" />
          <MapPin className="w-5 h-5 hover:text-purple-300" />
        </div>

        {/* Fake Post button */}
        <button
          className="bg-slate-800/40 text-slate-500 font-medium px-5 py-1.5 rounded-xl 
          group-hover:bg-slate-800/60 transition-all"
        >
          Post
        </button>
      </div>
    </GlassCard>
  );
}
