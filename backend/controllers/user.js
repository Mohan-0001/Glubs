const User = require('../schema/user');

// 👤 Render login form
exports.showLoginForm = (req, res) => {
  res.render('html/login.ejs');
};

// 📄 Get all users
exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('club', 'name').populate('auth', 'email role');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// 👁️ Get user by ID
exports.showUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('club', 'name').populate('auth', 'email role');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// ➕ Create user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully!',
      user: savedUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

// ✏️ Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User updated successfully!",
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
};

// ❌ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User deleted successfully!",
      user: deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ message: "Error deleting user", error: error.message });
  }
};

// 🔍 Search users by club
exports.searchByClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const users = await User.find({ club: clubId }).populate('auth', 'email');

    if (!users.length) {
      return res.status(404).json({ message: "No users found for this club" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users by club:', error);
    res.status(500).json({ message: "Error searching users by club", error: error.message });
  }
};
