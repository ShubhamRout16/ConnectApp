import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Welcome, {user.name || "User"} 👋
      </h1>
      <p className="text-lg mt-2">{user.email}</p>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}