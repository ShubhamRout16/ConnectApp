import { useState } from "react"
import { NAV_ITEMS, CURRENT_USER } from "../../constant"
import GlassCard from "../ui/GlassCard"
import Avatar from "../ui/Avatar"
import { Zap, ChevronRight , LogOut} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const { user , logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed : ", err);
    }
  };
 
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 py-6 pl-6 pr-2 gap-6">
      {/* Logo */}
      <Link to="/">
      <div className="flex items-center gap-3 px-4 mb-2 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-purple blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-neon-purple to-neon-fuchsia flex items-center justify-center shadow-xl">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-white to-purple-200 font-mono">
          CONNECT
        </h1>
      </div>
      </Link>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-2">
        {NAV_ITEMS.map(item => {
          const isActive = activeTab === item.label
          return (
            <Link to={item.path} key={item.label}>
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`
                relative w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden
                ${
                  isActive
                    ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    : "text-slate-400 hover:text-white hover:bg-white/3"
                }
              `}
            >
              {/* Active Background Gradient */}
              {isActive && (
                <div className="absolute inset-0 bg-linear-to-r from-neon-purple/20 to-neon-fuchsia/10 border border-neon-purple/30 rounded-2xl"></div>
              )}

              <item.icon
                className={`
                  relative z-10 w-5 h-5 transition-all duration-300
                  ${
                    isActive
                      ? "text-neon-fuchsia drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]"
                      : "group-hover:text-neon-purple"
                  }
                `}
              />
              <span
                className={`relative z-10 font-mono font-medium text-sm tracking-wide ${
                  isActive ? "font-bold" : ""
                }`}
              >
                {item.label}
              </span>

              {/* Notification Badge */}
              {item.badge && (
                <span className="relative z-10 ml-auto w-5 h-5 flex items-center justify-center bg-neon-fuchsia text-white text-[10px] font-bold rounded-full shadow-lg shadow-fuchsia-500/40">
                  {item.badge}
                </span>
              )}
            </button>
            </Link>
          )
        })}
      </div>


      {/* sign out option */}
      <button 
        onClick={handleSignOut}
        className="w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/8 hover:border-red-500/20 border border-transparent transition-all duration-300 group"
        >
        <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="font-mono font-medium text-sm tracking-wide">Sign Out</span>
      </button>


      {/* User Profile Card */}
      <GlassCard className="p-3 hover:bg-white/5 cursor-pointer group border-white/5 hover:border-neon-purple/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl || "https://picsum.photos/id/64/200/200"}
            alt={user.name}
            hasStory={true}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate group-hover:text-neon-purple transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-slate-400 truncate font-mono">
              {user.username || `@${user.name}`}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </GlassCard>
    </aside>
  )
}


export default Sidebar