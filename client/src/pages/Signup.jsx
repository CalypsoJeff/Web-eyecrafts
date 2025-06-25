import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form); // send signup request
      alert("Signup successful. Please login.");
      navigate("/login"); // redirect to login page
    } catch (err) {
      alert("Signup failed");
      console.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
        className="bg-green-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
