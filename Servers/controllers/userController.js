import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

//Sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        personalInfo: user.personalInfo,
        billingDetails: user.billingDetails,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

//Sign up
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      personalInfo: savedUser.personalInfo,
      billingDetails: savedUser.billingDetails,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        personalInfo: user.personalInfo,
        billingDetails: user.billingDetails,
        isAdmin: user.isAdmin,
      });
    } else throw new Error("User not found");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Edit personalInfo
export const editPersonalInfo = async (req, res) => {
  try {
    const { name, dob, country, contact, email } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (email) {
      const users = await User.find({});
      if (users.some((user) => user.email === email))
        throw new Error("There is already an account with this email");
      else user.email = email;
    }

    if (name) {
      user.personalInfo.name = name;
    }

    if (dob) {
      user.personalInfo.dob = dob;
    }

    if (country) {
      user.personalInfo.country = country;
    }

    if (contact) {
      user.personalInfo.contact = contact;
    }

    const savedUser = await user.save();

    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      personalInfo: savedUser.personalInfo,
      billingDetails: user.billingDetails,
      isAdmin: savedUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Edit billing details
export const editBillingDetails = async (req, res) => {
  try {
    const { fullName, email, phone, country, address, city, state, postcode } =
      req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (fullName) user.billingDetails.fullName = fullName;
    if (email) user.billingDetails.email = email;
    if (phone) user.billingDetails.phone = phone;
    if (country) user.billingDetails.country = country;
    if (address) user.billingDetails.address = address;
    if (city) user.billingDetails.city = city;
    if (state) user.billingDetails.state = state;
    if (postcode) user.billingDetails.postcode = postcode;

    const savedUser = await user.save();

    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      personalInfo: savedUser.personalInfo,
      billingDetails: user.billingDetails,
      isAdmin: savedUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPass, newPass } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    const match = await bcrypt.compare(currentPass, user.password);

    if (!match) throw new Error("Password is incorrect");

    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPass, salt);

    user.password = newPasswordHash;

    const savedUser = await user.save();

    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      personalInfo: savedUser.personalInfo,
      billingDetails: user.billingDetails,
      isAdmin: savedUser.isAdmin,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
