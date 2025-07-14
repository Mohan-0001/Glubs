const ClubAdmin = require("../schema/clubAdmin");

// 🔍 Get all club admins
exports.showAllClubAdmins = async (req, res) => {
  try {
    const clubAdmins = await ClubAdmin.find();
    res.status(200).json(clubAdmins);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve club admins", error: error.message });
  }
};

// 🔍 Get one club admin by ID
exports.showClubAdmin = async (req, res) => {
  try {
    const clubAdmin = await ClubAdmin.findById(req.params.id);
    if (!clubAdmin) {
      return res.status(404).json({ message: "Club Admin not found" });
    }
    res.status(200).json(clubAdmin);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format", error: error.message });
  }
};

// ➕ Create new club admin
exports.createClubAdmin = async (req, res) => {
  try {
    const newClubAdmin = new ClubAdmin(req.body);
    const saved = await newClubAdmin.save();
    res.status(201).json({
      message: "Club Admin created successfully!",
      clubAdmin: saved
    });
  } catch (error) {
    console.error("Error creating club admin:", error);
    res.status(400).json({
      message: "Error creating club admin",
      error: error.message
    });
  }
};

// ✏️ Update club admin
exports.updateClubAdmin = async (req, res) => {
  try {
    const updated = await ClubAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Club Admin not found" });
    }
    res.status(200).json({
      message: "Club Admin updated successfully!",
      clubAdmin: updated
    });
  } catch (error) {
    console.error("Error updating club admin:", error);
    res.status(400).json({
      message: "Error updating club admin",
      error: error.message
    });
  }
};

// ❌ Delete club admin
exports.deleteClubAdmin = async (req, res) => {
  try {
    const deleted = await ClubAdmin.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Club Admin not found" });
    }
    res.status(200).json({
      message: "Club Admin deleted successfully!",
      clubAdmin: deleted
    });
  } catch (error) {
    console.error("Error deleting club admin:", error);
    res.status(400).json({
      message: "Error deleting club admin",
      error: error.message
    });
  }
};

// 🧪 Optional: Show HTML form (if using SSR)
exports.showCreateClubAdminForm = (req, res) => {
  // res.render("html/clubAdmin.ejs");
};
