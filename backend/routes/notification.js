const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');
const { authenticate } = require('../middlewares/authMiddleware');

// 📥 Create a new notification (admin/club-admin use)
router.post('/', authenticate, notificationController.createNotification);

// 📤 Get all notifications for a user (inbox)
router.get('/:userId', authenticate, notificationController.showAllNotifications);

// ✅ Mark as read / update notification
router.put('/:id', authenticate, notificationController.updateNotification);

// ❌ Delete a notification
router.delete('/:id', authenticate, notificationController.deleteNotification);

module.exports = router;
