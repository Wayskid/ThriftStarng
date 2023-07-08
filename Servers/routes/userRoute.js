import express from "express";
import { getProfile, signIn, signUp } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const usersRoute = express.Router();

// Login
usersRoute.post("/signIn", signIn);

// SignUp
usersRoute.post("/signUp", signUp);

// Get profile
usersRoute.get("/profile", protect, getProfile);

export default usersRoute;
