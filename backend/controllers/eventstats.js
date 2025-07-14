const EventStats = require('../schema/eventState');

// 📋 Get all event statistics
exports.showAllEventStats = async (req, res) => {
  try {
    const stats = await EventStats.find().populate('event', 'title date');
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔍 Get stats for a single event
exports.showEventStats = async (req, res) => {
  try {
    const stats = await EventStats.findById(req.params.id).populate('event', 'title');
    if (!stats) {
      return res.status(404).json({ message: 'Event stats not found' });
    }
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(400).json({ message: 'Invalid ID or server error', error: error.message });
  }
};

// ➕ Create new event stats
exports.createEventStats = async (req, res) => {
  try {
    const newStats = new EventStats(req.body);
    const saved = await newStats.save();
    res.status(201).json({
      message: 'Event stats created successfully!',
      stats: saved
    });
  } catch (error) {
    console.error('Error creating event stats:', error);
    res.status(400).json({ message: 'Error creating event stats', error: error.message });
  }
};

// ✏️ Update stats
exports.updateEventStats = async (req, res) => {
  try {
    const updated = await EventStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Event stats not found' });
    }

    res.status(200).json({
      message: 'Event stats updated successfully!',
      stats: updated
    });
  } catch (error) {
    console.error('Error updating event stats:', error);
    res.status(400).json({ message: 'Error updating event stats', error: error.message });
  }
};

// ❌ Delete stats
exports.deleteEventStats = async (req, res) => {
  try {
    const deleted = await EventStats.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Event stats not found' });
    }

    res.status(200).json({
      message: 'Event stats deleted successfully!',
      stats: deleted
    });
  } catch (error) {
    console.error('Error deleting event stats:', error);
    res.status(400).json({ message: 'Error deleting event stats', error: error.message });
  }
};
