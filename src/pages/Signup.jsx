import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // logic to prevent the logged in users from the login and signup page
  const { user } = useAuth();

  useEffect(() => {
    if(user) navigate("/");
  }, [user , navigate]);

  const [form, setForm] = useState({
    name: "",
    username: "",
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
      await signup(
        form.email,
        form.password,
        form.name,
        form.username
      );
      navigate("/"); // redirect home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            value={form.username}
            onChange={handleChange}
            required
          />

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
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
