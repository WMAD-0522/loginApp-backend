import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkAuth from "../middleware/check_auth.js";

const router = express.Router();

let findUserByEmail = (email) => User.findOne({ email });

let createUser = (body, hash) =>
  new User({
    fullName: body.fullName,
    username: body.username,
    email: body.email,
    password: hash,
  });

let createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "thejwtsecret", {
    expiresIn: "2h",
  });
console.log(process.env.JWT_SECRET || "thejwtsecret", "JWT_SECRET");

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(401).json({ message: "User Already Exist!" });
    }
    // hash the password, 10 is the salt round (the higher the more secure)
    const hash = await bcrypt.hash(req.body.password, 10);

    // create a new user
    const user = createUser(req.body, hash);

    // save the user
    const result = await user.save();

    res.status(201).json({ message: "User created!", result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ message: "Auth failed no such user" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Auth failed incorrect password" });
    }

    const token = createToken({ email: user.email, userId: user._id });
    res.status(200).json({ token, expiresIn: 7200, user: user });
  } catch (e) {
    console.log(e);
  }
});

router.get("/", checkAuth, async (req, res) => {
  try {
    const { userId } = req.userData;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User could not found." });
    }
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await findUserByUsername(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User could not found." });
    }
    res.status(200).json({ message: "User found!", user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  await User.findOneAndRemove({ username: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "User could not found.",
      });
    } else {
      return res.status(200).json({
        message: "User deleted from db successfully!",
        user: user,
      });
    }
  });
});

export default router;
