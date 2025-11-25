import { SUGGESTED_USERS, TRENDING_TOPICS } from "../../constant"
import GlassCard from "../ui/GlassCard"
import Avatar from "../ui/Avatar"
import { Search, TrendingUp, ExternalLink, Plus } from "lucide-react"

const RightSidebar = () => {
  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 py-6 pr-6 pl-2 gap-6">
      {/* Search Widget */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-neon-purple transition-colors duration-300" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl leading-5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-neon-purple focus:border-neon-purple/50 focus:bg-slate-900/80 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300"
          placeholder="Search universe..."
        />
      </div>

      {/* Trending Topics */}
      <GlassCard className="p-5 hoverEffect={false}">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-mono font-bold text-sm text-slate-300 flex items-center gap-2 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-neon-fuchsia" />
            Trending
          </h3>
        </div>
        <div className="space-y-1">
          {TRENDING_TOPICS.map((topic, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-white/3 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-200 group-hover:text-neon-purple transition-colors">
                  {topic.tag}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {topic.posts} posts
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity">
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Suggested People */}
      <GlassCard className="p-5 hoverEffect={false}">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-mono font-bold text-sm text-slate-300 uppercase tracking-wider">
            Who to follow
          </h3>
          <button className="text-xs text-neon-purple hover:text-neon-fuchsia transition-colors">
            See all
          </button>
        </div>
        <div className="space-y-4">
          {SUGGESTED_USERS.map(user => (
            <div key={user.id} className="flex items-center gap-3 group">
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                size="md"
                isVerified={user.isVerified}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate font-mono">
                  {user.username}
                </p>
              </div>
              <button className="p-2 rounded-xl bg-white/5 hover:bg-neon-purple/20 text-slate-300 hover:text-neon-purple border border-white/5 hover:border-neon-purple/50 transition-all duration-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Footer */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 text-[11px] text-slate-600 font-mono">
        <a href="#" className="hover:text-slate-400">
          Terms
        </a>
        <a href="#" className="hover:text-slate-400">
          Privacy
        </a>
        <a href="#" className="hover:text-slate-400">
          Cookies
        </a>
        <span className="w-full mt-2">© 2025 Connect Inc.</span>
      </div>
    </aside>
  )
}

export default RightSidebar
