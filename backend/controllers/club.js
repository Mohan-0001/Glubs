const Club = require('../schema/club');

// 📄 Get all clubs
exports.showAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('members', 'name'); // Optional: populate members
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};

// ➕ Create a new club
exports.createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔍 Get single club by ID
exports.showClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('members', 'name department');
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.status(200).json(club);
  } catch (err) {
    res.status(400).json({ error: 'Invalid club ID' });
  }
};

// ✏️ Update a club
exports.updateClub = async (req, res) => {
  try {
    const updated = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Club not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete a club
exports.deleteClub = async (req, res) => {
  try {
    const deleted = await Club.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Club not found' });
    res.status(200).json({
      message: 'Club deleted successfully',
      club: deleted
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid club ID' });
  }
};
