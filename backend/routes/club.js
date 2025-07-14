const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club');
const { authenticate } = require('../middlewares/authMiddleware');

// 📥 Create a new club (restricted to admin or club-admin)
router.post('/', authenticate, clubController.createClub);

// 📄 Get all clubs
router.get('/', clubController.showAllClubs);

// 🔍 Get a single club by ID
router.get('/:id', clubController.showClub);

// ✏️ Update a club
router.put('/:id', authenticate, clubController.updateClub);

// ❌ Delete a club
router.delete('/:id', authenticate, clubController.deleteClub);

module.exports = router;
