import { useState,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/Theme";
const Login = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { login,fetchUser } = useAuth();
  
     const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
             setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const res = await api.post("/auth/login", formData);
         await fetchUser();
        navigate("/dashboard");
    } catch (err) {
        console.log("Backend Error:", err.response?.data);

        setError(
            err.response?.data?.message ||
            "Login failed"
        );
    } finally {
        setLoading(false);
    }
};
   return (
<div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8">

        {/* Logo */}

        <div className="flex flex-col items-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl font-bold">
                C
            </div>

            <h1 className="text-3xl text-white font-bold mt-4">
                ConnectHub
            </h1>

            <p className="text-slate-400 mt-2">
                Welcome back!
            </p>
        </div>

        {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-5 text-red-300 text-sm">
                {error}
            </div>
        )}

        {/* Username */}

        <div className="mb-4">

            <label className="text-slate-300 text-sm block mb-2">
                Username or Email
            </label>

            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username or email"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
        </div>

        {/* Password */}
        <div className="mb-6">

            <label className="text-slate-300 text-sm block mb-2">
                Password
            </label>

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
        </div>

        <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold text-white"
        >
            {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-slate-400 mt-6">
            Don't have an account?
            <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 ml-2"
            >
                Register
            </Link>
        </p>
    </div>
</div>
);
};

export default Login;