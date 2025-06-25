import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, deletePost, fetchPosts } from "../api/post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  // Load posts
  const getPosts = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  // Add post
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("Both fields required");
    try {
      const res = await createPost(form);
      setPosts([res.data, ...posts]); // prepend
      setForm({ title: "", content: "" }); // clear form
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Dashboard</h1>

      {/* Add Blog Form */}
      <form
        onSubmit={handleAddPost}
        className="space-y-4 border p-4 mb-8 rounded bg-gray-50 shadow"
      >
        <h2 className="text-xl font-semibold">Add New Blog</h2>
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
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Blog
        </button>
      </form>

      {/* Post List */}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            <div className="mt-2 space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
