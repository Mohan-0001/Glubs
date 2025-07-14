const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement');
const { authenticate } = require('../middlewares/authMiddleware');

// 📢 Create a new announcement
router.post('/', authenticate, announcementController.createAnnouncement);

// 📄 Get all active announcements (filters out expired ones)
router.get('/', announcementController.getActiveAnnouncements);

// ❌ Delete an announcement
router.delete('/:id', authenticate, announcementController.deleteAnnouncement);

// 📁 Get all announcements (even expired, admin only)
router.get('/all', authenticate, announcementController.getAllAnnouncementsAdmin);

module.exports = router;