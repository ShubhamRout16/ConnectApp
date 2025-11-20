import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function Navbar(){
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blue-xl bg- white/5 border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* logo of the app */}
        <Link className="text-2xl font-semibold bg-linear-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text" to="/">
          Connect
        </Link>


        {/* links (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <Link className="hover:text-purple-300 transition" to="/">Home</Link>
          <Link className="hover:text-purple-300 transition" to="/create-post">Create</Link>
          <Link className="hover:text-purple-300 transition" to="/profile">Profile</Link>

          {/* user + logout */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}