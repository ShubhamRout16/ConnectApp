import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { WavyBackground } from "../components/ui/wavy-background";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError("Invalid login credentials",err);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-2xl transition-all duration-300 focus:outline-none text-sm font-mono";

  const handleFocus = (e) => {
    e.target.style.background = "rgba(88, 28, 135, 0.5)";
    e.target.style.boxShadow = "0 0 20px rgba(168, 85, 247, 0.3)";
  };

  const handleBlur = (e) => {
    e.target.style.background = "rgba(88, 28, 135, 0.3)";
    e.target.style.boxShadow = "none";
  };

  return (
    <WavyBackground
      colors={["#7c3aed", "#a855f7", "#c084fc", "#a78bfa", "#8b5cf6"]}
      backgroundFill="#0a0a0a"
      blur={10}
      speed="fast"
      waveOpacity={0.6}
      containerClassName="min-h-screen flex items-center justify-center"
      className="w-full"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap');
        `}
      </style>

      <div className="w-full flex justify-center mt-12">
        <div
          className="w-full max-w-xl rounded-4xl p-12 lg:p-14 border"
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(34px)",
            borderColor: "rgba(139,92,246,0.25)",
            boxShadow:
              "inset 0 1px 3px rgba(255,255,255,0.06), inset 0 -1px 3px rgba(139,92,246,0.06), 0 30px 60px rgba(0,0,0,0.45), 0 0 40px rgba(124,58,237,0.08)",
          }}
        >
          <h1
            className="text-3xl sm:text-4xl font-bold text-center mb-8"
            style={{ fontFamily: "Fira Mono, monospace", color: "#F3F3F3" }}
          >
            Login
          </h1>

          {error && (
            <div
              className="p-3 rounded-lg mb-5 text-center text-sm bg-red-600/10 border-red-600/20 text-red-200"
              style={{ fontFamily: "Fira Mono, monospace" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="text-white/90 text-sm font-semibold font-mono mb-2 block"
              >
                Email*
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={inputBase}
                style={{
                  background: "rgba(88, 28, 135, 0.3)",
                  border: "1px solid rgba(168, 85, 247, 0.5)",
                  color: "#fff",
                }}
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="text-white/90 text-sm font-semibold font-mono mb-2 block"
              >
                Password*
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={inputBase}
                style={{
                  background: "rgba(88, 28, 135, 0.3)",
                  border: "1px solid rgba(168, 85, 247, 0.5)",
                  color: "#fff",
                }}
                value={form.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold font-mono text-sm mt-4 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg,#9333ea 0%,#7e22ce 100%)",
                color: "#fff",
                boxShadow: "0 0 30px rgba(147,51,234,0.6)",
              }}
            >
              Login
            </button>
          </form>

          <p
            className="text-center mt-6 text-xs sm:text-sm"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Fira Mono, monospace",
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-violet-300 hover:text-violet-200 font-semibold"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </WavyBackground>
  );
}
