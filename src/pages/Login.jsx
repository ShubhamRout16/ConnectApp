import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // logic to prevent the logged in users from the signup and login page
  const { user } = useAuth();

  useEffect(() => {
    if(user){
      navigate("/");
    }
  },[user , navigate]);
 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/"); // redirect home after login
    } catch (err) {
      setError("Invalid login credentials" , err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
