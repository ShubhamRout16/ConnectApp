import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { WavyBackground } from "../components/ui/wavy-background";

function AuthForm({ form, setForm, loading, onSubmit }) {
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputClass =
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
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-white text-sm font-semibold font-mono mb-1 block">
          Name*
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className={inputClass}
          style={{
            background: "rgba(88, 28, 135, 0.3)",
            border: "1px solid rgba(168, 85, 247, 0.5)",
            color: "#fff",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Username */}
      <div>
        <label className="text-white text-sm font-semibold font-mono mb-1 block">
          Username*
        </label>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          className={inputClass}
          style={{
            background: "rgba(88, 28, 135, 0.3)",
            border: "1px solid rgba(168, 85, 247, 0.5)",
            color: "#fff",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-white text-sm font-semibold font-mono mb-1 block">
          Email*
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={inputClass}
          style={{
            background: "rgba(88, 28, 135, 0.3)",
            border: "1px solid rgba(168, 85, 247, 0.5)",
            color: "#fff",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-white text-sm font-semibold font-mono mb-1 block">
          Password*
        </label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          className={inputClass}
          style={{
            background: "rgba(88, 28, 135, 0.3)",
            border: "1px solid rgba(168, 85, 247, 0.5)",
            color: "#fff",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={form.password}
          onChange={handleChange}
          required
        />
        <p className="text-white/60 text-xs mt-1 font-mono">
          Must be at least 9 characters long.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full font-semibold font-mono transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
        style={{
          background: loading
            ? "rgba(139, 92, 246, 0.5)"
            : "linear-gradient(135deg,#9333ea 0%,#7e22ce 100%)",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 0 30px rgba(147, 51, 234, 0.6)",
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Divider */}
      <div className="mt-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(168,85,247,0.2),transparent)",
              }}
            />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-3 text-xs"
              style={{
                background: "rgba(20,8,40,0.95)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Fira Mono, monospace",
              }}
            >
              Or continue with
            </span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="py-3 rounded-2xl border text-white text-sm font-mono hover:bg-white/5"
            style={{
              borderColor: "rgba(168,85,247,0.4)",
              background: "rgba(88,28,135,0.2)",
            }}
          >
            Google
          </button>
          <button
            className="py-3 rounded-2xl border text-white text-sm font-mono hover:bg-white/5"
            style={{
              borderColor: "rgba(168,85,247,0.4)",
              background: "rgba(88,28,135,0.2)",
            }}
          >
            Apple
          </button>
        </div>
      </div>

      {/* footer login link */}
      <p className="text-center mt-6 text-xs text-white/70 font-mono">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="cursor-pointer text-violet-300 hover:text-violet-200 font-semibold"
        >
          Login
        </span>
      </p>
    </form>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        await signup(form.email, form.password, form.name, form.username);
        navigate("/");
      } catch (err) {
        setError(err.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    },
    [form, signup, navigate]
  );

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap');
      `}</style>

      <div className="w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* LEFT TEXT BLOCK */}
          <div className="lg:col-span-2 mt-[6%] lg:translate-x-[50%]">
            <h1
              className="text-5xl font-extrabold mb-4"
              style={{ fontFamily: "Fira Mono", color: "#F3F3F3" }}
            >
              Welcome to <span className="text-violet-300">Connect</span>
            </h1>

            <p
              className="text-lg leading-relaxed text-white/80"
              style={{ fontFamily: "Fira Mono" }}
            >
              Where moments turn into{" "}
              <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-purple-400">
                memories
              </span>
              . <br />
              <br />
              Join a new era of social connection, powered by{" "}
              <span className="font-bold text-violet-300">creativity</span>,
              <span className="font-bold text-violet-300"> community</span>, and{" "}
              <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-purple-400">
                cosmic vibes
              </span>
              .
            </p>
          </div>

          {/* RIGHT SIGNUP CARD */}
          <div className="lg:col-span-3 flex justify-end">
            <div
              className="w-full max-w-md p-10 rounded-3xl border"
              style={{
                background: "rgba(15,23,42,0.68)",
                backdropFilter: "blur(34px)",
                borderColor: "rgba(139,92,246,0.25)",
                boxShadow:
                  "inset 0 1px 3px rgba(255,255,255,0.06), inset 0 -1px 3px rgba(139,92,246,0.06), 0 30px 60px rgba(0,0,0,0.45), 0 0 40px rgba(124,58,237,0.08)",
              }}
            >
              <h2
                className="text-3xl font-bold text-center mb-6"
                style={{ fontFamily: "Fira Mono", color: "#fff" }}
              >
                Create Account
              </h2>

              {error && (
                <div className="text-center bg-red-600/10 text-red-200 border border-red-600/20 p-3 rounded-lg mb-4 font-mono text-sm">
                  {error}
                </div>
              )}

              <AuthForm
                form={form}
                setForm={setForm}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

        </div>
      </div>
    </WavyBackground>
  );
}
