import API from "./axios";

export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const signupUser = (data) => API.post("/auth/signup", data);
