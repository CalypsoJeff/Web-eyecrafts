import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/post";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  // Load post details
  const getPost = async () => {
    try {
      const res = await fetchPost(id);
      setForm({ title: res.data.title, content: res.data.content });
    } catch (err) {
      console.error("Failed to load post", err);
      alert("Could not find the post");
      navigate("/");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, form);
      alert("Post updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
      <form
        onSubmit={handleUpdate}
        className="space-y-4 border p-4 rounded shadow bg-gray-50"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2"
          rows={5}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
