const Auth = require('../schema/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_secret'; // move this to .env in production

// 🔐 Signup Controller
exports.signup = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    email = email.toLowerCase();

    // Check for duplicate email
    const existing = await Auth.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Default to 'user' if no role provided
    if (!role) role = 'user';

    const hashed = await bcrypt.hash(password, 10);
    const user = new Auth({ email, password: hashed, role });

    await user.save();
    res.status(201).json({ message: 'Signup successful', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔓 Signin Controller
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await Auth.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Signin successful',
      token,
      userId: user._id,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
