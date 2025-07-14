const User = require('../schema/user');
const Auth = require('../schema/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_secret';

exports.signup = async (req, res) => {
  try {
    const { name, email, password, department, yearOfStudy, age } = req.body;

    const existing = await Auth.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const auth = await Auth.create({ email, password: hashed, role: 'user' });

    const user = await User.create({
      auth: auth._id,
      name,
      department,
      yearOfStudy,
      age
    });

    const token = jwt.sign(
      { id: user._id, authId: auth._id, role: auth.role },
      SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: auth.email,
        role: auth.role
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find Auth entry
    const auth = await Auth.findOne({ email });
    if (!auth) return res.status(404).json({ message: "User not found" });

    console.log("DB password:", auth.password);
console.log("Entered password:", password);


    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, auth.password);
    console.log(isMatch);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Fetch linked User profile
    const user = await User.findOne({ auth: auth._id }).populate('club', 'name'); // optional populate

    if (!user)
      return res.status(404).json({ message: "User profile not found for this account" });

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id, authId: auth._id, role: auth.role },
      SECRET,
      { expiresIn: '7d' }
    );

    // 5. Respond with user + auth info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        department: user.department,
        role: auth.role,
        email: auth.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

