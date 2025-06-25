import API from "./axios";

// Get all posts
export const fetchPosts = () => API.get("/posts");

// Get post by ID
export const fetchPost = (id) => API.get(`/posts/${id}`);

// Create new post
export const createPost = (data) => API.post("/posts", data);

// Update post
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

// Delete post
export const deletePost = (id) => API.delete(`/posts/${id}`);
