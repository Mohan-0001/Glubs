const Notification = require('../schema/notification');

// 🔔 Get all notifications for a specific user
exports.showAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// ➕ Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({
      message: 'Notification created successfully!',
      notification
    });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(400).json({ error: err.message });
  }
};

// ✅ Mark notification as read
exports.updateNotification = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({
      message: 'Notification marked as read.',
      notification: updated
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(400).json({ message: 'Failed to update notification', error: error.message });
  }
};

// ❌ Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully!",
      notification: deleted
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(400).json({ message: 'Failed to delete notification', error: error.message });
  }
};
