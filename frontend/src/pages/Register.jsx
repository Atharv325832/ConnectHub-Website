import { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/Theme";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    await api.post("/auth/register", formData);
    await fetchUser();
    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message || "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};

 return (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8"
    >

      {/* Logo */}
      <div className="flex flex-col items-center mb-8">

        <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center text-3xl font-bold text-white">
          C
        </div>

        <h1 className="text-3xl font-bold text-white mt-4">
          ConnectHub
        </h1>

        <p className="text-slate-400 mt-2">
          Create your account
        </p>

      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      {/* Username */}

      <div className="mb-4">

        <label className="block text-slate-300 mb-2">
          Username
        </label>

        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
          required
        />

      </div>

      {/* Email */}

      <div className="mb-4">

        <label className="block text-slate-300 mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-6">

        <label className="block text-slate-300 mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg text-white font-semibold"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-slate-400 mt-6">
        Already have an account?

        <Link
          to="/login"
          className="text-green-400 hover:text-green-300 ml-2"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
);
};
export default Register;