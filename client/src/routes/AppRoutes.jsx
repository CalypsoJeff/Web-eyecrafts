import { Route, Router, Routes } from "react-router-dom";

import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import EditPost from "../pages/EditPost";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
}

export default AppRoutes;
