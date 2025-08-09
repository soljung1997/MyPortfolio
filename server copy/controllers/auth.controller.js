// server/controllers/auth.controller.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

// ✅ SIGN UP - Register a new user
const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed', details: err.message });
  }
};

// ✅ SIGN IN - Log in user and generate token
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(401).json({ error: 'Could not sign in' });
  }
};

// ✅ SIGN OUT - Clear auth token
const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signed out' });
};

// ✅ Middleware - Require JWT Token
const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

// ✅ Middleware - Authorization Check
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

// ✅ Export All Functions
export default {
  signup,
  signin,
  signout,
  requireSignin,
  hasAuthorization,
};
