import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("click");
      const res = await loginUser(form);
      console.log(res.data);
      saveToken(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
      console.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        className="w-full p-2 border"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
