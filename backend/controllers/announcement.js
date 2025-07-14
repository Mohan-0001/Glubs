const Announcement = require('../schema/announcement');

// 📄 Get all active announcements (not expired)
module.exports.getActiveAnnouncements = async (req, res) => {
  try {
    const today = new Date();
    const announcements = await Announcement.find({ validTill: { $gte: today } }).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

// 📁 Admin-only: Get all announcements including expired
module.exports.getAllAnnouncementsAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all announcements' });
  }
};

// 📢 Create new announcement
module.exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, image, validTill } = req.body;

    const newAnnouncement = new Announcement({
      title,
      description,
      image,
      validTill,
      createdBy: req.user._id
    });

    const saved = await newAnnouncement.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete an announcement
module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Announcement not found' });

    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
};
