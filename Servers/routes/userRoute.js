import express from "express";
import {
  changePassword,
  editBillingDetails,
  editPersonalInfo,
  getProfile,
  signIn,
  signUp,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const usersRoute = express.Router();

// Login
usersRoute.post("/signIn", signIn);

// SignUp
usersRoute.post("/signUp", signUp);

// Get profile
usersRoute.get("/:userId", protect, getProfile);

// Edit personal info
usersRoute.patch("/:userId/settings/personalInfo", protect, editPersonalInfo);

// Edit billing details
usersRoute.patch("/:userId/settings/billingDetails", protect, editBillingDetails);

// Change password
usersRoute.patch("/:userId/settings/password", protect, changePassword);

export default usersRoute;
